import React,{useState} from "react";
import Navbar from "./Navbar";
import "../styles/FormStyle.css"
import Footer from "./Footer";

export default function Register(props){
    const[email,setEmail]= useState('');
    const [emailError, setEmailError] = useState('');
    const[password, setPassword]=useState('');
    const [passError, setPassError] = useState('');
    const[name,setName]=useState('');
    const[nameError,setNameError]=useState('');

    //set up the format for email
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError('Invalid email format');
        } else {
          setEmailError('');
        }
      };

      //set up the format for password
      const validatePassword = () => {
        if (password.length < 6) {
          setPassError('Must be at least 6 characters');
        } else {
          setPassError('');
        }
      };

      //set up the format for name
      const validateName = () => {
        if (name.length <= 0) {
          setNameError('Must fill your username');
        } else {
          setNameError('');
        }
      };
    
      //the result of click submit button
      const handleSubmit = (e) => {
        e.preventDefault();
        validateEmail();
        validatePassword();
        validateName();
    
        // Check if there are any validation errors
        if (emailError || passError || nameError) {
          return;
        }
    
        // Clear form fields
        setEmail('');
        setPassword('');
        setName('');
        console.log('Success Register!!!')
      };

      
    return(
      <div>
      <div className="container">
        <Navbar/>
        <div className="auth-form-container">
          <h1>Register</h1>
          <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input 
              value={name} 
              name="name" 
              onChange={(e) => setName(e.target.value)} 
              onBlur={validateName} 
              id="name" 
              placeholder="full Name" 
            />
            { nameError && <p className="error-message"style={{color:'brown',fontSize:'revert' }}>{ nameError }</p>}
            <label htmlFor="email">email</label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              onBlur={validateEmail}
              type="email" 
              placeholder="youremail@gmail.com" 
              id="email" 
              name="email" 
            />
            { emailError && <p className="error-message" style={{color:'brown',fontSize:'revert'}}>{ emailError }</p>}
            <label htmlFor="password">password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              onBlur={validatePassword} 
              type="password" 
              placeholder="********" 
              id="password" 
              name="password"
            />
            { passError && <p className="error-message" style={{color:'brown',fontSize:'revert',marginBottom:'10px'}}>{ passError }</p>}
            <button type="submit">Submit</button>
          </form>
        </div>
        
      </div>
      <Footer/>
      </div>
    )
}