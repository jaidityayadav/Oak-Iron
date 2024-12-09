import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { NavLink, useNavigate } from 'react-router-dom';
import "../css/login.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/v1/signup', {
                name,
                email,
                password,
            });

            console.log(response.data); // Debugging line

            if (response.data.success) {
                console.log("Signup successful");
                navigate('/login');
            } else {
                console.error("Signup failed");
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup", error);
            alert("An error occurred during signup. Please try again.");
        }
    };


    return (
        <div className="auth-main-container">
            <Header/>
            <div className="auth-container">
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Already have an account? <NavLink to="/login">Log in</NavLink>
                </p>
            </div>
            <Footer/>
        </div>
    );
}

export default Signup;