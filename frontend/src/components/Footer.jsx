import React from 'react'
import '../css/style.css'

function Footer() {
    return (
        <div id="contact">
            <div>
                <strong>Contact Us:</strong>
            </div>
            <hr className="dash" />
            <div>
                <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:contact@furniturestore.com">
                        contact@furniturestore.com
                    </a>
                </p>
                <p>
                    <strong>Phone: </strong> <a href="tel:123456789">(123) 456-7890</a>
                </p>
                <p>
                    <strong>Address: </strong>123 Furniture St, Home City
                </p>
            </div>
        </div>
    )
}

export default Footer