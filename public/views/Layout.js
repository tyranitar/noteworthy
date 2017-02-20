import React from 'react';
import ReactDOM from 'react-dom';

import {FloatingActionButton} from 'material-ui'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {ReactMic, startRecording, stopRecording, saveRecording, getBlobURL } from 'react-mic/lib/index';

export default class Layout extends React.Component {

    constructor() {
        super();

        this.startRecorder = () => {
          //console.log(ReactMic);
          startRecording();
        }
        this.stopRecorder = () => {
          stopRecording();
        }

        this.saveRecording = () => {
          const savedRecordingBlob = saveRecording();
          console.log('the saved recording is (it is a blob): ', savedRecordingBlob);
        }
    }

    render() {
      return (<MuiThemeProvider>
        <div>
          <ReactMic backgroundColor="#FF4081"
            strokeColor="#000000"
          />
          <FloatingActionButton
            secondary={true}
            onTouchTap={this.startRecorder}>
            Hi Microphone here
          </FloatingActionButton>\

          <FloatingActionButton
            secondary={true}
            onTouchTap={this.stopRecorder}>
            Hi Microphone Stop
          </FloatingActionButton>

          <FloatingActionButton
            secondary={true}
            onTouchTap={this.saveRecording}>
            Hi Save Stop
          </FloatingActionButton>
        </div>
        </MuiThemeProvider>)
    }
}