import React from "react";
import IntroImg from "../../assets/into.png"
import { Link } from "react-router-dom";
import "../../styles/HeroImgStyle.css";

export default function HeroImg(){
    return(
        <div className="hero">
            <div className="mask">
                <img className="into-img"
                    src={IntroImg} alt="IntroImg"/>
            </div>
            <div className="content">
                <p>Welcome to </p>
                <h2>Live Currency Portal</h2>
                <div>
                    <Link to="/fxconverter" className="btn"> -FX Converter-</Link>
                    <Link to="/register" className="btn btn-light">Sign up now{'>>>'}</Link>
                </div>
                <p className="description">{'>>> '}You may click on FX Converter to convert a specific amount between two currencies or Historical Currency Rats to get currency information and trends. </p>

            </div>
        </div>
    )
    
}