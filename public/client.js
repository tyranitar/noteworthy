import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Layout from './views/Layout';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const history = useRouterHistory(createHashHistory)({ queryKey: false });
const app = document.getElementById('app');

ReactDOM.render(
    <Router history={ history }>
        <Route path='/' component={Layout}></Route>
    </Router>,
app);