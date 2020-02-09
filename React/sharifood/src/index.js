import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import './static/css/normalizer.css'
import ResturantPage from './component/resturant/ResturantPage';
import SignIn from './component/auth/SignIn'
import SignUp from './component/auth/SignUp'
import Navbar from './component/common/Navbar';
import Home from './component/common/Home'

export default class App extends Component {
    state = {
        isAuthenticated: false,
        token: null,
        user: null,
    }

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/resturant/:resturant_name' component={ResturantPage} />
                    <Route exact path='/signin' component={SignIn} />
                    <Route exact path='/signup' component={SignUp} />
                </Switch>
            </div>
        )
    }
}


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
