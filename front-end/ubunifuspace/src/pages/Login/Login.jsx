import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
        <form>
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
                    placeholder="Employee ID"
                  ></input>
                </label>
              </div>

              <div className="formGroup">
                <label className="Input_formLabel" htmlFor="password">
                  Password
                  <input
                    className="formiInput"
                    type="password"
                    placeholder="password"
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
