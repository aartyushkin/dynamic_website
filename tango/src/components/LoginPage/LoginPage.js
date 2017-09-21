import React from 'react';
import './LoginPage.css';

const LoginPage = () => (
    <div className="login-page">
    <form className="login-page-form" action="/action_page.php">

        <div className="login-page-imgcontainer">
            <img src="img/avatar.png" alt="Avatar" className="login-page-avatar" />
        </div>

        <div className="login-page-container">
            <label><b>Username</b></label>
            <input className="login-page-input" type="text" placeholder="Enter Username" name="uname" required />
            <label><b>Password</b></label>
            <input className="login-page-input" type="password" placeholder="Enter Password" name="psw" required />
            <button className="login-page-loginbtn" type="submit">Login</button>
            <input type="checkbox" />Remember me
        </div>

        <div className="container">
            <button className="login-page-cancelbtn" type="button">Cancel</button>
            <span className="login-page-psw">Forgot <a href="#">password?</a></span>
        </div>
    </form>
    </div>
);

export default LoginPage;