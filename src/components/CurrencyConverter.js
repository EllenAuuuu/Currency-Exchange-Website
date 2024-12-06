import React, { useState } from "react";
import { FetchCurrencies, fetchExchangeRate } from "../api/api_currencyconverter";
import {HiSwitchHorizontal} from 'react-icons/hi';
import Select from "react-select";
import "../styles/CurrencyConverterStyle.css";
import 'react-dropdown/style.css';


async function exchangeCurrency (data, callback) {
    const response = await fetchExchangeRate(data);
    callback(response.rates[data.toCurrency].rate_for_amount);
}

export default function CurrencyConverter(){
   
    const [fromCurrency, setFromCurrency] =useState ("AUD");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState(0);
    const [amountError, setAmountError] = useState(false);
    const [exchangeAmount, setExchangeAmount] = useState(0);

    const data = {
        fromCurrency,
        toCurrency,
        amount
    };

    //set up the format for amount
    const validateAmount = () => {
        if (!amount.match(/^[0-9]*[1-9][0-9]*$/)) {
          setAmountError(true);
        } else {
          setAmountError(false);
        }
      };
    


    const {loading, currenciesData, error} = FetchCurrencies(data);
    let options=[];
    
    if (!loading && currenciesData) {
        options = Object.keys(currenciesData.currencies)
            .sort()
            .map((currencyCode) => ({
            value: currencyCode,
            label: currencyCode,
        }));
    }

    if (loading){
        return <p>Loading...</p>
      }
    
      if (error){
        return <p>Somethong went wrong:{error.message}</p>
      }
      
    // switch two currencies
      function flip() {
        var temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
        setExchangeAmount(0); // Reset the converted amount
        exchangeCurrency({ fromCurrency: toCurrency, toCurrency: fromCurrency, amount }, setExchangeAmount);
      }
     return(
        <div className="currency-converter">
            <div className="converter-heading"></div>
            <div className="converter-container">
                <div className="amount">
                    <h3>Amount</h3>
                    <input className={`amountInput ${amountError ? "error" : ""}`}
                            type="text"
                            pattern="[0-9]*[1-9][0-9]*" 
                            placeholder="$ Enter the amount " 
                            onChange={(e) => { setAmount(e.target.value) }}
                            onBlur={validateAmount}>
                    </input>
                    {amountError && <p className="error-message" style={{color : "brown" }}>Please enter a valid amount!!</p>}                           
                </div>
                <div className="fromtoto">
                    <div className="from1">
                        <h3>From</h3>
                        <Select options={options}
                            onChange={(e) => { setFromCurrency(e.label) }}
                            value={fromCurrency}
                            placeholder={fromCurrency}
                            isSearchable={true}
                            styles={{control: (provided) => ({...provided, color: "black"}),
                                singleValue: (provided) => ({...provided, color: "black"}),
                                option: (provided) => ({...provided, color: "black"})
                        }}/>
                    </div> 
                    <div className="converter-switch">
                        <HiSwitchHorizontal size="50px" 
                        onClick={() => {flip() }}/>
                    </div>
                    <div className="to1">
                        <h3>To</h3>
                        <Select options={options}
                            onChange={(e) => { setToCurrency(e.label) }}
                            value={toCurrency}
                            placeholder={toCurrency}
                            isSearchable={true}
                            styles={{
                                control: (provided) => ({...provided, color: "black",}),
                                singleValue: (provided) => ({...provided, color: "black",}),
                                option: (provided) => ({...provided, color: "black",}),
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="converter-result">
                <button className="amountbutton" 
                    onClick={() => exchangeCurrency({ fromCurrency, toCurrency, amount }, setExchangeAmount)}>
                        Convert
                </button>
                <h2>Converted Amount:</h2>
                <p>$ {amount} [{fromCurrency}] to $ { exchangeAmount } [{toCurrency}] </p>
            </div>  
        </div>
    )
}



