import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg/HeroImg2";
import "../App.css"
import SearchPage from "../components/SearchPage";


export default function HistoricalFXRates(){
    return(
        <div className="format">
            <Navbar/>
            <HeroImg2 heading="Historical FX Rates" text=""/>
            <SearchPage/>
            <Footer/>
        </div>
    )
}