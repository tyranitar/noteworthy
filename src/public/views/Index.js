import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Mic from 'material-ui/svg-icons/av/mic';
import Stop from 'material-ui/svg-icons/av/stop';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import { grey500, tealA400, white } from 'material-ui/styles/colors';
import Recorder from 'react-recorder'

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
          playing: false 
        }

        this.onStop = (blob) => {
          var blobUrl = URL.createObjectURL(blob);
          var reader = new FileReader;
            
          reader.onload = function() {
            var blobAsDataUrl = reader.result;
            var base64 = blobAsDataUrl.split(',')[1];
            var buf = new Buffer(base64, 'base64');
            fs.writeFile("audio/test.mp3", buf, function(err) {
              if(err) {
                console.log("err", err);
              } else { 
              }
            }) 
          };
            
          reader.readAsDataURL(blob);
        }

        this.startRecorder = () => {
          this.refs.Recorder.start();
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
    render() {
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

                        {this.state.playing && 
                            <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white } onTouchTap={this.stop}>
                                <Stop />
                            </FloatingActionButton>
                        }

                        <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white }>
                            <FileUpload />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }
}