import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>Hello, World!</div>
            </MuiThemeProvider>
        );
    }
}