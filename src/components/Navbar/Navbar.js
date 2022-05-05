import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {
    return (
        <div className='nav-wrapper'>
            <div> Welcome to Abra Weather Assignment</div>
            <nav className="nav">
                <Link className="link" to="/Homepage">HomePage</Link> | {" "} 
                <Link className="link" to="/Favorites">Favorites</Link>
            </nav>
        </div>
    )
}
export default Navbar