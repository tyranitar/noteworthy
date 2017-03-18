import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

<<<<<<< HEAD
import Index from './views/Index';
import Record from './views/Record';
import Upload from './views/upload/Upload';
=======
import Index from './views/index/Index';
import Record from './views/record/Record';
>>>>>>> develop

const app = document.getElementById('app');

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={ hashHistory }>
            <Route path='/' component={ Index }></Route>
            <Route path='/record' component={ Record }></Route>
            <Route path = '/upload' component= { Upload }></Route>
        </Router>
    </MuiThemeProvider>,
app);