import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import React, {useState} from "react";

const Login = () => {

  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange =(event) => {

    const name = event.target.name;
    const value = event.target.value;
    setInputs(values =>({...values, [name]: value}));

  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(inputs)
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
    </div>
  );
};

export default Login;
