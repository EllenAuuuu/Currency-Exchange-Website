import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../styles/AllCurrenciesStyle.css"

export default function AllCurrencies () {
  const [rowData, setRowData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { headerName: "Currency Name", field: "currencyName", width: 250 },
    { headerName: "Currency Code", field: "currencyCode", width: 150 },
  ];

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          "https://currency-converter5.p.rapidapi.com/currency/list",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "2eb3dac40bmsh83af16cfd40d54ep133577jsn8a91d1054f1a",
              "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        const currencies = data.currencies;
        const currencyList = Object.keys(currencies)
          .map((currencyCode) => ({
            currencyCode,
            currencyName: currencies[currencyCode],
          }))
          // Sort by currencyName
          .sort((a, b) => a.currencyName.localeCompare(b.currencyName)); 
        setRowData(currencyList);
        setFilteredData(currencyList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
    filterData(selectedOption);
  };

  const filterData = (selectedOption) => {
    if (selectedOption) {
      const filtered = rowData.filter(
        (row) =>
          row.currencyCode === selectedOption.currencyCode ||
          row.currencyName === selectedOption.currencyName
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(rowData);
    }
  };

  return (
    <div className="contentAll">
        <h2 className="title">All Currencies List</h2>
        <p >If you don't know the Currency's name, search it!</p>

      <Select className="searchAll"
        options={rowData}
        getOptionLabel={(option) =>
        `${option.currencyCode} - ${option.currencyName}`
        }
        getOptionValue={(option) => option.currencyCode}
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        placeholder="Select a currency"
      />

      <div className="ag-theme-balham" style={{ height: "300px", width: "400px" }}>
        <AgGridReact
          columnDefs={columns}
          rowData={filteredData}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
      </div>
    </div>
  );
}
