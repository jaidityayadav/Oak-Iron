import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { items } from '../data';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../css/cartpage.css';

function ProductPage() {
    const { itemName } = useParams();
    const item = items.find((item) => item.name === itemName);
    const [count, setCount] = useState(0);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartCount = async () => {
            if (!token) {
                console.warn("No token found. Skipping cart count fetch.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/getCartItemCount/${itemName}`, {
                    headers: { token },
                });
                setCount(response.data.itemCount || 0);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setCount(0);
                } else {
                    console.error("Error fetching cart item count:", error);
                }
            }
        };

        if (itemName) {
            fetchCartCount();
        }
    }, [itemName, token]);

    if (!item) {
        return <p>Item not found</p>;
    }

    const handleAddToCart = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/addToCart/${itemName}`, {
                itemName,
                quantity: 1,
            }, {
                headers: { token },
            });
            if (response.data.success) {
                setCount((prevCount) => prevCount + 1);
            }
            else{
                alert("Not Logged In");
                navigate('/login');
            }
        } catch (error) {
            alert("Error adding item to cart. Please try again.");
            console.error("Error adding item to cart:", error);
        }
    };

    const handleIncrease = async () => {
        if (!token) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/addToCart/${itemName}`, {
                quantity: 1,
            }, {
                headers: { token },
            });
            if (response.data.success) {
                setCount((prevCount) => prevCount + 1);
            }
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const handleDecrease = async () => {
        if (!token || count <= 0) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/removeFromCart/${itemName}`, {
                quantity: 1,
            }, {
                headers: { token },
            });
            if (response.data.success) {
                setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    return (
        <div className="home-container">
            <Header />

            <div id="cartItem">
                <div className="cartImg">
                    <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="cartInfo">
                    <h2>{item.name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</h2>
                    <p>{item.description}</p>
                    <p>Price: {item.price}</p>
                    {item.specification && (
                        <div className="specifications">
                            <h3>Specifications</h3>
                            <p>Weight: {item.specification.weight}</p>
                            <p>Color: {item.specification.color}</p>
                            <p>Dimensions: {item.specification.dimensions}</p>
                        </div>
                    )}
                    
                    {/* Specifications Section */}

                    {count === 0 ? (
                        <div id="addToCart" className="button" onClick={handleAddToCart}>
                            Add to Cart
                        </div>
                    ) : (
                        <div className="cart-controls">
                            <button id="inc-dec-btn" className="button" onClick={handleDecrease}>-</button>
                            <div id="count-display">{count}</div>
                            <button id="inc-dec-btn" className="button" onClick={handleIncrease}>+</button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ProductPage;
