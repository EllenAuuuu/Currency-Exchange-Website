import React, { useState } from "react";
import Navbar from "./Navbar";
import "../styles/FormStyle.css"
export default function Form(props) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');

  //sep up format for email
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  //sep up format for password
  const validatePassword = () => {
    if (password.length < 6) {
      setPassError('Must be at least 6 characters');
    } else {
      setPassError('');
    }
  };

  //the result of after clicking submit
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    // Check if there are any validation errors
    if (emailError || passError) {
      return;
    }

    // Clear form fields
    setEmail('');
    setPassword('');
    console.log('Success Login!!!')
  };

  return (
    <div className="container">
      <Navbar />
      <div className="auth-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {emailError && <p className="error-message" style= {{ color:'brown',fontSize:'revert'}}> { emailError }</p>}
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {passError && <p className="error-message" style= {{ color:'brown',fontSize:'revert', marginBottom:'5px'}}>{ passError }</p>}
          <button type="submit">Log In</button>
        </form>
        <button
          className="link-btn"
          onClick={() => props.onFormSwitch('register')}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
}
