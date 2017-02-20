import React from 'react';
import ReactDOM from 'react-dom';

import {FloatingActionButton} from 'material-ui'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Recorder from 'react-recorder'

export default class Layout extends React.Component {

    constructor() {
        super();

        this.onStop = (blob) => {
          console.log(blob);
          // Do something with the blob file of the recording
        }
        this.startRecorder = () => {
          this.refs.Recorder.start();
        }
        this.start = () => {
          console.log('Sup buddy');
        }
        this.stop = () => {
          this.refs.Recorder.stop();
        }
    }

    render() {
      return (<MuiThemeProvider>
        <div>
          <Recorder ref='Recorder' onStop={this.onStop} onStart ={this.start}/>
          <FloatingActionButton
            secondary={true}
            onTouchTap={this.startRecorder}>
            Hi Microphone here
          </FloatingActionButton>
          <FloatingActionButton
            secondary={true}
            onTouchTap={this.stop}>
            Stop
          </FloatingActionButton>

        </div>
        </MuiThemeProvider>)
    }
}