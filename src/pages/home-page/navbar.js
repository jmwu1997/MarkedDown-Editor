import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {

    logout(e) {
        this.props.clearMethod();
    };


    render() {

        const userLinks = (
            <div className="avbar-nnav-mr-auto">
                <ul className="navbar-nav mr-auto">
                    <li class="markdown">
                        Markdown Editor
                        </li>
                    <li className="navbar-item">
                        <a href="" onClick={this.logout.bind(this)}>Logout</a>
                    </li>
                    <li className="navbar-item">
                        <Link to="/editor" className="nav-link">Editor</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">About</Link>
                    </li>
                </ul>
            </div>  
        );

        const guestLinks = (
            <div className="navbar-nav-mr-auto">
                <ul className="navbar-nav mr-auto">
                    <li class="markdown">
                        Markdown Editor
                        </li>
                    <li className="navbar-item">
                        <Link to="/register" className="nav-link">Sign Up</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">About</Link>
                    </li>
                </ul>
            </div>
                
        );

        return (
            <nav className="navbar">
                <div className="collapse navbar-collapse">
                    {((this.props.parentState!==null)||localStorage.getItem('token')) ? userLinks : guestLinks}
                </div>
            </nav>

        );
    }
}


export default Navbar;
