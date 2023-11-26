import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      staffid: inputs.identity,
      password: inputs.password,
    }

    console.log(body);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        console.log(data.user);
        localStorage.setItem('userdata', JSON.stringify(data.user));
        window.location.href = '/home'

      } else {
       toast.error(`Failed to login: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred', error);
      // Handle network or other errors here
    }

  }


  return (
    <div id="SignIn_container">
      <div id="top_Icon_SignInPage">

        <div id="welcome_Note_SignIn_Page">

          <img src="./idea.png" alt="innovation_Space_logo" />

          <h1>
            Welcome to <br></br> <span id="ubunifu_Space">UbunifuSpace</span>
          </h1>
        </div>
      </div>
      <div id="form-SignIn-container">
        <form onSubmit={handleSubmit}>
          <div id="signIn_Components">
            <div id="signIn_logo">

            </div>

            <div id="signIn_Input_Components">
              <div className="formGroup">
                <label className="Input_formLabel" htmlFor="employeeID">
                  Employee ID
                  <input
                    className="formiInput"
                    type="text"
                    name="identity"
                    value={inputs.identity || ""}
                    placeholder="Employee ID"
                    onChange={handleChange}
                  ></input>
                </label>
              </div>

              <div className="formGroup">
                <label className="Input_formLabel" htmlFor="password">
                  Password
                  <input
                    className="formiInput"
                    type="password"
                    name="password"
                    value={inputs.password || ""}
                    placeholder="Password"
                    onChange={handleChange}
                  ></input>
                </label>
              </div>

              <div id="forgot-password">
                <p>Forgot Password?</p>
              </div>

              <div className="signIn_Button_Container">
                <button id="signIn_Button" type="submit">
                  Sign In
                </button>
              </div>

              <div id="new-here">
                <p>
                  New here? <span ><Link id="signUp_link" to="/signup">Sign Up</Link></span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
