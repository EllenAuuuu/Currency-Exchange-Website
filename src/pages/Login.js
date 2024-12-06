import React,{useState} from "react";
import Form from '../components/Form';
import Register from "../components/Register";
// import Navbar from "../components/Navbar";
 import Footer from "../components/Footer";
// import HeroImg2 from "../components/HeroImg2";

export default function Login(){
    const [currentForm, setCurrentForm] = useState('form');

    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }
  
    return(
      <div>
      
       <div className="Login">
        {
            currentForm === "form" ? <Form onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
       </div>
       <Footer/>
       </div>
    )
}