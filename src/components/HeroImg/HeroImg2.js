import React from "react";
import "../../styles/HeroImg2Style.css";

export default function HeroImg2 (props){
    return(
        <div className="hero-img">
            <div className="heading">
                <h1>{props.heading}</h1>
                <p>{props.text}</p>
            </div>
        </div>
    );
   
}