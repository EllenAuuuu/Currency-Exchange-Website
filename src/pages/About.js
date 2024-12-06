import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroImg2 from "../components/HeroImg/HeroImg2";
import AboutContent from "../components/AboutContent";
import "../App.css"


export default function About(){
    return(
        <div className="format">
            <Navbar/>
            <HeroImg2 heading="About" text=""/>
            <AboutContent/>

            <Footer/>
        </div>
    )
}