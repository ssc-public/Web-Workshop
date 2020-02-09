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
                    <Link to="/signin" className="nav-item nav-link ">ورود</Link>
                </li>
                <li className="nav-item">
                    <Link to="/signup" className="nav-item nav-link">عضویت</Link>
                </li>
            </Fragment>
        )
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div id="sidebarCollapse" className="btn navbar-brand">
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">خانه</Link>

                </div>
                <ul className="navbar-nav ml-auto">
                    {this.getState()}
                </ul>
            </nav>
        )
    }
}

export default Navbar