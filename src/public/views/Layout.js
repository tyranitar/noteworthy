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

        this.getStream = (stream) => {
          var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          var analyser = audioCtx.createAnalyser();
          var source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          var javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);
 
          analyser.smoothingTimeConstant = 0.3;
          analyser.fftSize = 1024;
       
          analyser.connect(javascriptNode);
          javascriptNode.connect(audioCtx.destination);
       
          var ctx = document.getElementById("mic_activity").getContext("2d");
        
          javascriptNode.onaudioprocess = function() {
              var array =  new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);
              var values = 0,
                length = array.length;
       
              for (var i = 0; i < length; i++) values += array[i];
       
              var average = values / length;
              ctx.clearRect(0, 0, 30, 150);
              var grad = ctx.createLinearGradient(1,1,28,148);
              grad.addColorStop(0,"#FF0000");
              grad.addColorStop(0.5, "yellow");
              grad.addColorStop(1,"#00FF00");
              ctx.fillStyle=grad;
              ctx.fillRect(1,148-average,28,148);
        }
    }
  }
    render() {

      return (<MuiThemeProvider>
        <div>
          <canvas id="mic_activity" width="500" height="150"></canvas>
          <Recorder ref='Recorder' onStop={this.onStop} onStart ={this.start} gotStream={this.getStream}/>
          <br/>
          <br/>
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