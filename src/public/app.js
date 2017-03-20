import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './views/home/Home';
import Index from './views/index/Index';
import Record from './views/record/Record';
import Upload from './views/upload/Upload';

const app = document.getElementById('app');

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={ hashHistory }>
            <Route path='/' component={ Home }>
	            <IndexRoute component={ Index }/>
	            <Route path='/record' component={ Record }></Route>
	            <Route path = '/upload' component={ Upload }></Route>
            </Route>
        </Router>
    </MuiThemeProvider>,
app);