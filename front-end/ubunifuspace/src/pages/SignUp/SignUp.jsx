import './SignUp.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [inputs, setinputs] = useState({});


    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setinputs(values => ({ ...values, [name]: value }));

    }

    const handleSubmit = (event) => {

        event.preventDefault();
        
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!inputs.email.match(emailRegex)) {
            toast.error("Invalid email address");
            return;
        }

        // Check if the password and confirm password fields match
        if (inputs.password !== inputs.confirm_password) {
            toast.error("Password and Confirm Password do not match.");
            return;
        }

        
        setinputs({});
        console.log(inputs);
        toast.success("Data Successifully Received");
    }


    return (
        <div id="container">
            <div id="innovation_Icon">
                <div id="welcome_Note">
                    <h1>Welcome to  <br></br> <span id="ubunifu_Space">UbunifuSpace</span></h1>
                </div>

                <img src="./idea.png" alt="innovation_Space_logo" />

            </div>
            <div id="form-container">
                <form onSubmit={handleSubmit}>

                    <h1 >Sign up to UbunifuSpace</h1>

                    <div className="formGroup">
                        <label className="formLabel" htmlFor="employeeID">Employee ID
                            <input
                                className="formiInput"
                                type="text"
                                name='employee_ID'
                                value={inputs.employee_ID || ""}
                                placeholder="Employee ID"
                                onChange={handleChange}
                            >
                            </input>
                        </label>
                    </div>

                    <div className="formGroup">
                        <label className="formLabel" htmlFor="email">Email
                            <input
                                className="formiInput"
                                type="email"
                                name="email"
                                value={inputs.email || ""}
                                placeholder="Email"
                                onChange={handleChange}
                            >
                            </input>
                        </label>
                    </div>


                    <div className="formGroup">
                        <label
                            className="formLabel"
                            htmlFor="password"
                        >Password
                            <input
                                className="formiInput"
                                type="password"
                                name="password"
                                value={inputs.password || ""}
                                placeholder="password"
                                onChange={handleChange}
                            >
                            </input>
                        </label>
                    </div>

                    <div className="formGroup">
                        <label className="formLabel" htmlFor="confirm_password">Confirm Password
                            <input
                                className="formiInput"
                                type="password"
                                name="confirm_password"
                                value={inputs.confirm_password || ""}
                                placeholder="Confirm_Password"
                                onChange={handleChange}
                            />

                        </label>
                    </div>

                    <div className="signIn_Button_Container">
                        <button
                            id="signIn_Button"
                            type="submit"
                        >Sign Up
                        </button>
                    </div>

                    <div id="new-here">
                        <p>Have an account? <span ><Link id="signUp_link" to="/">Login</Link></span></p>
                    </div>


                </form>

            </div>

            <ToastContainer />
        </div>
    )

}

export default SignUp;