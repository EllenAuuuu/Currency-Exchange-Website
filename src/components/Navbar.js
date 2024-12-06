import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaBars, FaTimes} from "react-icons/fa"
import LogoImg from "../assets/logo.png"
import '../styles/NavbarStyles.css';

export default function Navbar(){

    const[click, setClick]= useState(false);
    const handleClick = () =>setClick(!click);

    const[color, setColor]= useState(false);
    const changeColor = () =>{
        if(window.scrollY >=100){
            setColor(true)
        }else{
            setColor(false)
        }
    };

    window.addEventListener("scroll",changeColor);


     return(
        <div className={color ? "header header-bg":"header"}>
            <Link to="/"><img className="logo-img" src={LogoImg} alt="LogoImg"/></Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/fxconverter">FX Converter</Link>
                </li>
                <li>
                    <Link to="/historicalfxrates">Historical FX Rates </Link>
                </li>
                <li>
                    <Link to="/form">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul> 
            <div className='hamburger' onClick={handleClick}>{click ? (
                <FaTimes size={20} style={{color:"#fff"}}/>):(<FaBars size={20} style={{color:"#fff"}}/>)}
            </div>
        </div>
    )
}