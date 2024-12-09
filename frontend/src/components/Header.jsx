import React, { useState, useEffect } from 'react'
import "../css/style.css"
import { NavLink, useNavigate } from 'react-router-dom'


function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false); // Update login status
        // Redirect to login page
        navigate("/login");
    };

    return (
        <header>
            <div>
                <img src="/images/icon.png" alt="Oak & Iron Logo" />
                <NavLink to={"/home"}>
                    <h2>Oak &amp; Iron</h2>
                </NavLink>
            </div>
            <div id="nav">
                <NavLink to="/home">Featured Products</NavLink>
                {isLoggedIn ? (
                    <div className='loggedinNav'>
                        <NavLink to="/OrderSummary">Cart</NavLink>
                        <span onClick={handleLogout} className="logout-link">Logout</span>
                    </div>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </div>
        </header >
    )
}

export default Header