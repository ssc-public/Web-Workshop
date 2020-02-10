import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    logout = () => {
        this.props.logout()
    }

    getState = () => {
        if (this.props.isAuthenticated)
            return (
                <Fragment>
                    <li className="nav-item">
                        <button className="nav-item nav-link btn">{this.props.user.username}</button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item nav-link btn" onClick={this.logout}>Logout</button>
                    </li>
                </Fragment>
            )
        return (
            <Fragment>
                <li className="nav-item">
                    <Link to="/signin" className="nav-item nav-link ml-2">ورود</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" className="nav-item nav-link ml-2">عضویت</Link>
                </li>
            </Fragment>
        )
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{ height: "8vh" }}>
                <ul className="navbar-nav d-flex flex-row ">
                    <li className="nav-item">
                        <Link to="/" className="nav-item nav-link ml-2">خانه</Link>
                    </li>
                    {this.getState()}
                </ul>
            </nav>
        )
    }
}

export default Navbar