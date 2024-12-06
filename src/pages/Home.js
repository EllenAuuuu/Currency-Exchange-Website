import React from "react";
import Navbar from "../components/Navbar";
import HeroImg from "../components/HeroImg/HeroImg";
import Footer from "../components/Footer";
import "../App.css"
export default function Home(){
    return(
        <div className="format">
            <Navbar/>
            <HeroImg/>
            <Footer/>
        </div>
    )
}