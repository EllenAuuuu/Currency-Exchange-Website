import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg/HeroImg2";
import "../App.css"
import CurrencyConverter from "../components/CurrencyConverter";
import AllCurrencies from "../components/AllCurrencies";


// import ExchangeRateContent from "../components/ExchangeRateContent";

export default function FXConverter(){
    return(
        <div className="format">
            <Navbar/>
            <HeroImg2 heading=" FX Converter" text="Just Try it"/>
            <CurrencyConverter/>
            <AllCurrencies/>
            <Footer/>
        </div>
    )
}