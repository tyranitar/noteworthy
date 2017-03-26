import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import props from './props';

export default class Loader extends React.Component {
    render() {
        return (
            <div>
                <CircularProgress { ...props } />
            </div>
        )
    }
}