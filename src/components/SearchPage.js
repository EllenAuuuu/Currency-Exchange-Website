import React, { useEffect, useState } from "react";
import { fetchDailyInfo } from "../api/api_searchcurrency";
import {HiSwitchHorizontal} from 'react-icons/hi';
import Select from "react-select";
import { FetchCurrencies } from "../api/api_currencyconverter";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Badge } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import '../styles/SearchPageStyle.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import 'react-dropdown/style.css';

async function exchangeCurrency(data) {
    const response = await fetchDailyInfo(data);
  
    if (!response || !response['Time Series FX (Daily)']) {
      alert("Failed to fetch data");
      return [];
    }
  
    const dailyTableData = response['Time Series FX (Daily)'];
    let newTableData = [];
  
    Object.keys(dailyTableData).forEach((key) => {
      const data = dailyTableData[key];
      const newData = {};
      const regex = /[0-9.]/g;
  
      Object.keys(data).forEach((key) => {
        const newKey = key.replace(regex, '').trim();
        newData[newKey] = data[key];
      });
  
      const dateParts = key.split("-");
      const formattedDate = `${dateParts[0]}${dateParts[1]}${dateParts[2]}`;
      newData["date"] = formattedDate;
      newTableData.push(newData);
    });
  
    return newTableData;
}
  
function createTableData (tableData, callback) {
    callback(tableData);
}

export default function SearchPage(){
    
    const [from_symbol, setFrom_symbol] = useState("AUD");
    const [to_symbol, setTo_symbol] = useState("USD");
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState({
        labels:[],
        datasets:[
            {
                label:"Open",
                data:[] ,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor:"#fff",
                pointBorderWidth: 1,
            }
        ],
    });

    const data = {
        from_symbol,
        to_symbol,
    }

    let filterParamsOwn = {
        filterOptions: [
          'empty',
          {
            displayKey: 'specificDate',
            displayName: 'Specific Date',
            predicate: ([fv1], cellValue) =>
            cellValue == null || cellValue - 0 === fv1,
            numberOfInputs: 1,
          },
          {
            displayKey: 'between',
            displayName: 'Between',
            predicate: ([fv1, fv2], cellValue) =>
            cellValue == null || (fv1 <= cellValue && fv2 >= cellValue),
            numberOfInputs: 2,
          },
        ],
        maxNumConditions: 1,
      };

    const columns= [
        { headerName: "Date", field: "date", filter:"agNumberColumnFilter",
            width:120, filterParams:filterParamsOwn, sortable:true},
        { headerName: "Open", field: "open",width:110, sortable:true },
        { headerName: "High", field: "high",width:110, sortable:true},
        { headerName: "Low", field: "low",width:110, sortable:true},
        { headerName: "Close", field: "close",width:110, sortable:true},
    ]

    useEffect(() => {
        const fetchData = async() => {
            const tableData = await exchangeCurrency(data);
            createTableData(tableData, setTableData);
            
            const labels = tableData.map((item)=>item.date);
            const openData = tableData.map((item)=>item.open);
            const highData = tableData.map((item)=>item.high);
            const lowData = tableData.map((item)=>item.low);
            const closeData = tableData.map((item)=>item.close);

            //use four label to show on the line graoh
            setChartData((prevData)=> ({
                ...prevData,
                labels:labels.reverse(), //reverse the date from left to right
                datasets:[
                    {
                        label: 'Open',
                        data: openData,
                        borderColor: 'red',
                        borderWidth: 1,
                        fill: false,
                    },
                    {
                        label: 'High',
                        data: highData,
                        borderColor: 'blue',
                        borderWidth: 1,
                        fill: false,
                      },
                      {
                        label: 'Low',
                        data: lowData,
                        borderColor: 'yellow',
                        borderWidth: 1,
                        fill: false,
                      },
                      {
                        label: 'Close',
                        data: closeData,
                        borderColor: 'white',
                        borderWidth: 1,
                        fill: false,
                      },
                ],
            }))
        };

        fetchData();
    }, [from_symbol,to_symbol]);

        //fetch avaliable currencies
        function selectCurrency(){
            const { loading, currenciesData, error } =FetchCurrencies(data);
            if (!loading && currenciesData) {
                return Object.keys(currenciesData.currencies)
                .sort()
                .map((currencies)=>({
                    value: currencies,
                    label: currencies
        
                }));
            }
        
            if (loading){
                return <p>Loading...</p>
              }
            
              if (error){
                return <p>{error.message}</p>
              }
        }
        
        //switch two currencies
        function flip() {
            var temp = from_symbol;
            setFrom_symbol(to_symbol);
            setTo_symbol(temp);
        }
        
    
    return(
        <div>
            <div className="search-page">
                <div className="searchfunction">
                    <div className="from">
                    <h3>From</h3>
                    <Select options={selectCurrency()}
                            value={from_symbol}
                            onChange={(e) => { setFrom_symbol(e.label) }}
                            placeholder={from_symbol}
                            isSearchable={true}
                            styles={{
                                control: (provided) => ({...provided, color: "black"}),
                                singleValue: (provided) => ({...provided, color: "black",}),
                                option: (provided) => ({...provided, color: "black",}),
                            }}
                    />
                    </div>
                    <div className="converter-switch"><HiSwitchHorizontal size="50px" onClick={() => {flip() }}/></div>  
                    <div className="to">
                    <h3>To</h3>
                    <Select options={selectCurrency()}
                        value={to_symbol}
                        onChange={(e) => { setTo_symbol(e.label) }}
                        placeholder={to_symbol}
                        isSearchable={true}
                        styles={{
                            control: (provided) => ({...provided, color: "black"}),
                            singleValue: (provided) => ({...provided, color: "black"}),
                            option: (provided) => ({...provided, color: "black"}),
                        }}
                    />
                    </div>   
                </div>      
            <p className="badge">Total [<Badge color="success">{tableData.length}</Badge>] search from [{from_symbol}] to [{to_symbol}]</p>
            <div className="ag-theme-balham" style={{ height:"300px", width:"600px" }}>
                <AgGridReact 
                columnDefs={columns}
                rowData={tableData}
                pagination={true}
                paginationPageSize={10}
                />  
            </div>
            <div className="info" style={{marginTop:'10px'}}>
                <p style={{textAlign:"left", fontSize:'12px'}}>*In this table, showing the latest 100 data points.</p>
                <p style={{textAlign:"left",fontSize:'12px'}}>*Please follow the format of date(YYYYMMDD)to serach your specific date. </p>
                <p style={{textAlign:"left",fontSize:'12px'}}>*If you want to search a timeseries, just choose your start date and end date.</p>
            </div>     
            </div> 
            <div className="line-chart">
                <h3 style={{textAlign:'center'}}>Historical Currency Rate in latest 100 data points.</h3>
                <Line  style={{display:'flex'}} data={chartData} options={chartData.options}/>
            </div>
        </div>
    )
}


