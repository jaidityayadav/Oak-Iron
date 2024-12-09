import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import Home from './pages/Home';
import CoverPage from './pages/CoverPage';
import OrderSummary from './pages/OrderSummary';
import ProductPage from './pages/ProductPage';

function App() {
    return (
        <div className='app-container'>
            <Router>
                <div className="app-content">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="Welcome" element={<CoverPage />} />
                        <Route path="orderSummary" element={<OrderSummary/>} />
                        <Route path="/productPage/:itemName" element={<ProductPage />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;