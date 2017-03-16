import { createHashHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Index from './views/Index';

const history = useRouterHistory(createHashHistory)();
const app = document.getElementById('app');

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={ history }>
            <Route path='/' component={ Index }></Route>
        </Router>
    </MuiThemeProvider>,
app);