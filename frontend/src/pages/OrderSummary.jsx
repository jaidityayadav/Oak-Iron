import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import '../css/orderSummary.css';
import Footer from '../components/Footer';

const OrderSummary = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState(''); // New state for address
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/getCartItems", {
                    headers: { token },
                });
                setCartItems(response.data.cartItems);
            } catch (error) {
                console.error("Failed to fetch cart items", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleAddToCart = async (itemName) => {
        if (!token) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/addToCart/${itemName}`, {
                itemName,
                quantity: 1,
            }, { headers: { token } });
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.itemId.name === itemName
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const handleIncrease = async (itemName) => {
        if (!token) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/addToCart/${itemName}`, {
                quantity: 1,
            }, { headers: { token } });
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.itemId.name === itemName
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const handleDecrease = async (itemName) => {
        if (!token) return;
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/removeFromCart/${itemName}`, {
                quantity: 1,
            }, { headers: { token } });
            if (response.data.success) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.itemId.name === itemName
                            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!address) {
            alert("Please enter your address before placing the order.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/placeOrder", {
                address, // Include address in the order request
            }, {
                headers: { token }
            });
            if (response.data.message) {
                alert(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='summary-container'>
            <Header />
            <div className='summary-content'>
                <h2>Order Summary</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <div className='orderItem'>
                        {cartItems.map((item) => (
                            <div key={item.itemId._id} className="cart-item">
                                <img src={`../${item.itemId.imageUrl}`} alt={item.itemId.name} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.itemId.name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</h3>
                                    <p>Price: ${item.itemId.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <div className="cart-controls">
                                        {item.quantity === 0 ? (
                                            <button className="button" onClick={() => handleAddToCart(item.itemId.name)}>
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <div className='orderButtonGrid'>
                                                <button className="button" onClick={() => handleDecrease(item.itemId.name)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="button" onClick={() => handleIncrease(item.itemId.name)}>+</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <p>Total Price: ${cartItems.reduce((acc, item) => acc + item.itemId.price * item.quantity, 0).toFixed(2)}</p>

                {/* Address input */}
                <div className="address-container">
                    <label htmlFor="address">Shipping Address:</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your shipping address here"
                    />
                </div>

                <button onClick={handlePlaceOrder} className="button place-order-button">
                    Place Order
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default OrderSummary;
