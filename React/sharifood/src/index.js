import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import './static/css/normalizer.css'
import ResturantPage from './component/resturant/ResturantPage';
import SignIn from './component/auth/SignIn'
import SignUp from './component/auth/SignUp'

export default class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/resturants/:resturant_name' component={ResturantPage} />
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
