import React from "react";

import {
    Router,
    Switch,
    Route
} from "react-router-dom";

// layout
// import Layout from "./components/layout";

// views
import Inicio from './views/inicio';
import history from './config/history';




const Routers = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Inicio} />
            </Switch>
        </Router >
    )

}


export default Routers
