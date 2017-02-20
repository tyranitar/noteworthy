import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import Layout from './views/Layout';
import injectTapEventPlugin from 'react-tap-event-plugin';

const history = useRouterHistory(createHashHistory)();
const app = document.getElementById('app');

injectTapEventPlugin();

ReactDOM.render(
    <Router history={ history }>
        <Route path='/' component={ Layout }></Route>
    </Router>,
app);