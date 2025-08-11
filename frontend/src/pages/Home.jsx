import React from 'react'
import "../css/style.css"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

export const imageURLs = {
    // Icons
    chairIcon: "https://oakiron.s3.amazonaws.com/images/svgs/chair.svg",
    diningIcon: "https://oakiron.s3.amazonaws.com/images/svgs/dining.svg",
    sofaIcon: "https://oakiron.s3.amazonaws.com/images/svgs/sofa.svg",

    // Chairs
    chair1: "https://oakiron.s3.amazonaws.com/images/chair/chair1.jpg",
    chair2: "https://oakiron.s3.amazonaws.com/images/chair/chair2.jpg",
    chair3: "https://oakiron.s3.amazonaws.com/images/chair/chair3.jpg",

    // Dining tables
    dining1: "https://oakiron.s3.amazonaws.com/images/dining/dining1.png",
    dining2: "https://oakiron.s3.amazonaws.com/images/dining/dining2.jpg",
    dining4: "https://oakiron.s3.amazonaws.com/images/dining/dining4.jpg",

    // Sofas
    sofa1: "https://oakiron.s3.amazonaws.com/images/sofa/sofa1.jpg",
    sofa2: "https://oakiron.s3.amazonaws.com/images/sofa/sofa2.jpg",
    sofa4: "https://oakiron.s3.amazonaws.com/images/sofa/sofa4.jpg",
};

function Home() {
    return (
        <div className="home-container">
            <Header />
            <div id="containing">
                {/* Main Content Section */}
                <div id="main">
                    <div id="explore">
                        <h2>Explore Our Furniture Range</h2>
                        <hr />
                    </div>

                    {/* Icons */}
                    <div className="icons">
                        <div>
                            <a href="#chair">
                                <img src={imageURLs.chairIcon} alt="Chair" />
                                <h3>Chair</h3>
                            </a>
                        </div>
                        <div>
                            <a href="#dining">
                                <img src={imageURLs.diningIcon} alt="dining table" />
                                <h3>Dining</h3>
                            </a>
                        </div>
                        <div>
                            <a href="#sofa">
                                <img src={imageURLs.sofaIcon} alt="Sofa" />
                                <h3>Sofa</h3>
                            </a>
                        </div>
                    </div>

                    {/* Chairs */}
                    <div id="chair">
                        <h2>Chairs</h2>
                        <hr style={{ width: 30 }} />
                        <div className="Products">
                            <div className="card">
                                <NavLink to="/productpage/pearl-chair">
                                    <div>
                                        <img src={imageURLs.chair1} alt="Chair" />
                                    </div>
                                    <div>
                                        <h3>Pearl</h3>
                                        <p>Price: $250</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="card">
                                <NavLink to="/productpage/classic-chair">
                                    <div>
                                        <img src={imageURLs.chair2} alt="Chair" />
                                    </div>
                                    <div>
                                        <h3>Classic</h3>
                                        <p>Price: $200</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="card">
                                <NavLink to="/productpage/vintage-chair">
                                    <div>
                                        <img src={imageURLs.chair3} alt="Chair" />
                                    </div>
                                    <div>
                                        <h3>Vintage</h3>
                                        <p>Price: $700</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Dining Tables */}
                    <div id="dining">
                        <h2>Dining Tables</h2>
                        <hr style={{ width: 60 }} />
                        <div className="Products">
                            <div className="card">
                                <NavLink to="/productpage/white-marble-dining-table">
                                    <div>
                                        <img src={imageURLs.dining1} alt="Chair" />
                                    </div>
                                    <div>
                                        <h3>White Marble</h3>
                                        <p>Price: $1200</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="card">
                                <NavLink to="/productpage/walnut-dining-table">
                                    <div>
                                        <img src={imageURLs.dining2} alt="Chair" />
                                    </div>
                                    <div>
                                        <h3>Walnut</h3>
                                        <p>Price: $700</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="card">
                                <NavLink to="/productpage/teak-dining-table">
                                    <div>
                                        <img src={imageURLs.dining4} alt="Chair" />
                                    </div>
                                    <div>
                                        <h3>Teak</h3>
                                        <p>Price: $800</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Sofas */}
                    <div id="sofa">
                        <h2>Sofas</h2>
                        <hr style={{ width: 30 }} />
                        <div className="Products">
                            <div className="card">
                                <NavLink to="/productpage/greywool-sofa">
                                    <div>
                                        <img src={imageURLs.sofa1} alt="greywool-sofa" />
                                    </div>
                                    <div>
                                        <h3>Greywool</h3>
                                        <p>Price: $350</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="card">
                                <NavLink to={"/productpage/satin-sofa"}>
                                    <div>
                                        <img src={imageURLs.sofa2} alt="satin-sofa" />
                                    </div>
                                    <div>
                                        <h3>Satin</h3>
                                        <p>Price: $450</p>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="card">
                                <NavLink to="/productpage/modern-sofa">
                                    <div>
                                        <img src={imageURLs.sofa4} alt="modern-sofa" />
                                    </div>
                                    <div>
                                        <h3>Modern</h3>
                                        <p>Price: $900</p>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Home
