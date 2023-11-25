import './SignUp.css';

const SignUp = () =>{


    return(
        <div id="container">
             <div id="innovation_Icon"> 
                <div id="welcome_Note">
                    <h1>Welcome to  <br></br> <span id="ubunifu_Space">UbunifuSpace</span></h1>
                </div>
                    
                    <img src="./idea.png" alt="innovation_Space_logo" />
                
                </div>
                <div id="form-container">
                    <form>

                        <h1 >Sign up to UbunifuSpace</h1>

                        <div className="formGroup">
                            <label className="formLabel" htmlFor="employeeID">Employee ID
                                <input className="formiInput" type="text" placeholder="Employee ID">
                                </input>
                            </label>
                        </div>

                        <div className="formGroup">
                            <label className="formLabel" htmlFor="email">Email
                                <input className="formiInput" type="email" placeholder="Email">
                                </input>
                            </label>
                        </div>
                        
                        
                        <div className="formGroup">
                            <label className="formLabel" htmlFor="password">Password
                                <input className="formiInput" type="password" placeholder="password">
                                </input>
                            </label>
                        </div>

                        <div className="formGroup">
                            <label className="formLabel" htmlFor="confirm_password">Confirm Password
                                <input className="formiInput" type="password" placeholder="password">
                                </input>
                            </label>
                        </div>

                        <div id="forgot-password">
                            <p>Forgot Password?</p>
                        </div>
                        
                        
                        <div className="signIn_Button_Container">
                            <button id="signIn_Button" type="submit">Sign In</button>
                        </div>
                        
                    </form>
                </div>

        </div>
    )

}

export default SignUp;