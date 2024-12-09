import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { NavLink, useNavigate } from 'react-router-dom';
import "../css/login.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', {
                email,
                password,
            });

            if (response.data.token) {
                // Save token in localStorage
                localStorage.setItem('token', response.data.token);
                console.log("Login successful");
                navigate('/'); // Redirect to home page
            } else {
                console.error("Login failed, no token received");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("Login failed. Please check your email and password.");
        }
    };

    return (
        <div className="auth-main-container">
            <Header/>
            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <NavLink className="signup-link" to="/signup">Sign up</NavLink>
                </p>
            </div>
            <Footer/>
        </div>
    );
}

export default Login;