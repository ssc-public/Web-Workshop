import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import './static/css/normalizer.css'
import ResturantPage from './component/resturant/ResturantPage';

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => (
                    <ResturantPage />
                )} />
                {/*<Route exact path="/sth" component={}/>*/}
            </Switch>
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
