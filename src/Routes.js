import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from './history';
import ProductList from "./components/ProductList";
import Home from "./components/Home";
import Detail from "./components/Detail";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/products" component={ProductList} />
                    <Route path="/detail/:id" component={Detail} />
                </Switch>
            </Router>
        )
    }
}
