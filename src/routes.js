import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import resources from "./environments/resources";
import HomePageComponent from "./components/HomePageComponent";
import ProductsContainer from "./containers/ProductsContainer";
import AccessoriesContainer from './containers/AccessoriesContainer';
import ShoppingCartContainer from "./containers/ShoppingCartContainer";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <Router>
            <Switch>
                <Route path={ resources.routes.basePath } component={ HomePageComponent } exact />
                <Route path={ resources.routes.productsPath } component={ ProductsContainer } exact />
                <Route path={ resources.routes.accessoriesPath } component={ AccessoriesContainer } exact />
                <Route path={ resources.routes.shoppingCartPath } component={ ShoppingCartContainer } exact />
            </Switch>
        </Router>
    );
};
