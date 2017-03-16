import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Mic from 'material-ui/svg-icons/av/mic';
import Stop from 'material-ui/svg-icons/av/stop';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Pause from 'material-ui/svg-icons/av/pause';
import { grey500, tealA400, white } from 'material-ui/styles/colors';
import Recorder from 'react-recorder'
import fs from 'fs';
import DialogBox from '../components/DialogBox';
import FlatButton from 'material-ui/FlatButton';

const layoutStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
};

const fullWidth = {
    width: '100%'
};

const headerStyle1 = {
    fontFamily: 'Ubuntu',
    fontWeight: 'bold',
    fontSize: '75px',
    color: grey500
};

const headerStyle2 = {
    fontFamily: 'Ubuntu',
    fontWeight: 'bold',
    fontSize: '75px',
    color: tealA400
}

const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
};

const buttonStyle = {
    margin: '25px',
    padding: '25px',
    border: `5px solid ${ tealA400 }`
};

const iconStyle = {
    width: '100px',
    height: '100px',
    fill: tealA400
};

export default class Index extends React.Component {
    constructor() {
        super();

        this.state = {
          playing: false,
          dialogOpen: false,
          text: '',
          url: '',
          pause: false
        }

        this.onChangeText = (evt) => {
          this.setState({text: evt.currentTarget.value});
        }

        this.onStop = (blob) => {
          this.setState({blob: blob, dialogOpen: true});
        }

        this.onCancel = () => {
          this.setState({dialogOpen: false});
        }

        this.onSuccessSubmit = () => {

          var reader = new FileReader;
          var blob = this.state.blob;
          var self = this;

          reader.onload = function() {
            var blobAsDataUrl = reader.result;
            var base64 = blobAsDataUrl.split(',')[1];
            var buf = new Buffer(base64, 'base64');
            var filePath = 'audio/' + self.state.text + '.mp3'
            fs.writeFile(filePath, buf, function(err) {
              if(err) {
                console.log("err", err);
              } else { 
                self.setState({dialogOpen: false, url: filePath})
              }
            }) 
          };
            
          reader.readAsDataURL(blob);
        }

        this.startRecorder = () => {
          if (this.state.paused && !this.state.playing) {
            this.refs.Recorder.resume();
            this.state.node.connect(this.state.audioCtx.destination);
            this.setState({playing: true, paused: false})
          } else {
            this.refs.Recorder.start();
          }
        }

        this.start = () => {
          this.state.node.connect(this.state.audioCtx.destination);
          this.setState({playing: true});
        }

        this.stop = () => {
          this.state.node.disconnect();
          this.refs.Recorder.stop();
          this.setState({playing: false})
        }

        this.pause = () => {
           this.state.node.disconnect();
          this.refs.Recorder.pause();
          this.setState({playing: false, paused: true})
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

          javascriptNode.onaudioprocess = function() {
              var ctx = document.getElementById("mic_activity").getContext("2d");
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

          this.setState({node: javascriptNode, audioCtx: audioCtx});
          //javascriptNode.connect(audioCtx.destination);
        }
    }

    renderStopOrPauseOptions() {
      if (this.state.playing) {
        return (
          <div>
            <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white } onTouchTap={this.stop}>
              <Stop />
            </FloatingActionButton>
            <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white } onTouchTap={this.pause}>
              <Pause />
            </FloatingActionButton>
          </div>
          )
      }
    }

    renderSubmitButton() {
      if (!this.state.playing && this.state.url) {
        return <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white } onTouchTap={()=>{window.location.href='/next'}}>
                <Stop />
               </FloatingActionButton>
      }
    }

    render() {

        const dialogActions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.onCancel}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.onSuccessSubmit}
          />
        ];

        return (
            <div style={ layoutStyle }>
                <div style={ fullWidth }>
                    <div style={ containerStyle }>
                        <span style={ headerStyle1 }>Note</span><span style={ headerStyle2 }>worthy</span>
                    </div>

                    <canvas id="mic_activity" width="500" height="150"></canvas>

                    <div style={ containerStyle }>
                        <Recorder ref='Recorder' onStop={this.onStop} blobOpts={{type: 'audio/mp3'}} onStart ={this.start} gotStream={this.getStream}/>

                        {!this.state.playing &&
                            <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white } onTouchTap={this.startRecorder}>
                                <Mic />
                            </FloatingActionButton>
                        } 

                        <DialogBox ref='Dialog' actions={dialogActions} open={this.state.dialogOpen}>
                          <label for ="fileName">File Name</label>
                          <input type = "text" onChange={this.onChangeText}/>
                        </DialogBox>


                        {this.renderStopOrPauseOptions()}

                        <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white }>
                            <FileUpload />
                        </FloatingActionButton>
                    </div>

                    {this.state.url && 
                      <audio controls>
                        <source src = {'../' + this.state.url} />
                      </audio>
                    }

                    {this.renderSubmitButton()}

                </div>
            </div>
        );
    }
}