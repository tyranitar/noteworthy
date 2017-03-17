import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Mic from 'material-ui/svg-icons/av/mic';
import Stop from 'material-ui/svg-icons/av/stop';
import Pause from 'material-ui/svg-icons/av/pause';
import Delete from 'material-ui/svg-icons/action/delete';
import Resume from 'material-ui/svg-icons/av/play-arrow';
import Recorder from 'react-recorder'
import fs from 'fs';
import DialogBox from '../components/DialogBox';
import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/av/skip-next';
import Styles from '../js/styles';

export default class Record extends React.Component {

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

	    this.deleteUrl = () => {
	        fs.unlinkSync(this.state.url);
	        this.setState({url: ''});
	    }

	    this.onSuccessSubmit = () => {

	        const reader = new FileReader;
	       	const blob = this.state.blob;

	        reader.onload = () => {
	            const blobAsDataUrl = reader.result;
	            const base64 = blobAsDataUrl.split(',')[1];
	            const buf = new Buffer(base64, 'base64');
	            const filePath = '../temp/' + this.state.text + '.mp3'
	            fs.writeFile(filePath, buf, (err) => {
	                if (err) {
	                    console.error("err", err);
	                } else {
	                    this.setState({dialogOpen: false, url: filePath})
	                }
	            }) 
	        }
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
	    	const ctx = document.getElementById("mic_activity").getContext("2d");
	    	ctx.clearRect(0, 0, 500, 150);
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
		    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		    const analyser = audioCtx.createAnalyser();
		    const source = audioCtx.createMediaStreamSource(stream);
		    source.connect(analyser);
		    const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

		    analyser.smoothingTimeConstant = 0.3;
		    analyser.fftSize = 1024;
		   
		    analyser.connect(javascriptNode);
		    const ctx = document.getElementById("mic_activity").getContext("2d");
		    var gradient = ctx.createLinearGradient(0,0,0,300);
		    gradient.addColorStop(1,'#000000');
		    gradient.addColorStop(0.75,'#ff0000');
		    gradient.addColorStop(0.25,'#ffff00');
		    gradient.addColorStop(0,'#ffffff');
		 
		    // when the javascript node is called
		    // we use information from the analyzer node
		    // to draw the volume
		    javascriptNode.onaudioprocess = function() {
		 
		        // get the average for the first channel
		        var array =  new Uint8Array(analyser.frequencyBinCount);
		        analyser.getByteFrequencyData(array);
		 
		        // clear the current state
		        ctx.clearRect(0, 0, 1000, 325);
		 
		        // set the fill style
		        ctx.fillStyle=gradient;
		        drawSpectrum(array);
		 
		    }
		    function drawSpectrum(array) {
		    	for ( var i = 0; i < (array.length); i++ ){
		            var value = array[i];
		            ctx.fillRect(i*5,325-value,3,325);
		        }
		    };

	    	this.setState({node: javascriptNode, audioCtx: audioCtx});
   	 	}
   	}

   	renderStopOrPauseOptions() {
        if (this.state.playing) {
            return (
                <div>
                    <FloatingActionButton style={ Styles.btnLarge } iconStyle={ Styles.iconLarge } backgroundColor={ Styles.white } onTouchTap={this.stop}>
                        <Stop />
                    </FloatingActionButton>
                    
                    <FloatingActionButton style={ Styles.btnLarge } iconStyle={ Styles.iconLarge } backgroundColor={ Styles.white } onTouchTap={this.pause}>
                        <Pause />
                    </FloatingActionButton>
                </div>
            )
        }
    }

    renderSubmitButton() {
        if (!this.state.playing && this.state.url) {
            return (
                <div style = {Styles.containerStyle} > 
                    <FloatingActionButton style={ Styles.btnMed } iconStyle={ Styles.iconMed } backgroundColor={ Styles.white }>
                        <Next />
                    </FloatingActionButton>
                </div>
            )
        }
    }

    renderResumeOrPlayOptions() {
        if (this.state.paused) {
            return <Resume/>
        } else {
            return <Mic/>
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

        const audioTrack = document.getElementById("audioTrack");
        
        if (audioTrack) {
            audioTrack.load();
        }

        return (
            <div style={ Styles.layoutStyle }>
                <div style={ Styles.fullWidth }>
                    <canvas id="mic_activity" style={Styles.audioCanvas}></canvas>

                    <div style={ Styles.containerStyle }>
                        <Recorder ref='Recorder' onStop={this.onStop} blobOpts={{type: 'audio/mp3'}} onStart ={this.start} gotStream={this.getStream}/>

                        {!this.state.playing &&
                            <FloatingActionButton style={ Styles.btnLarge } iconStyle={ Styles.iconLarge } backgroundColor={ Styles.white } onTouchTap={this.startRecorder}>
                                {this.renderResumeOrPlayOptions()}
                            </FloatingActionButton>
                        } 

                        <DialogBox ref='Dialog' actions={dialogActions} title='Enter a name for your submission' open={this.state.dialogOpen}>
                          <label htmlFor ='fileName'>File Name</label>
                          <input type = "text" onChange={this.onChangeText} id='fileName'/>
                        </DialogBox>


                        {this.renderStopOrPauseOptions()}
                    </div>

                    {this.state.url && 
                      
                      <div style ={ Styles.audioTrackContainer }>
                        <audio id = "audioTrack" controls>
                          <source src = {'../' + this.state.url} />
                        </audio>
                        <FloatingActionButton style={ Styles.btnSmallAudio } iconStyle={ Styles.iconSmall } backgroundColor={ Styles.white } onTouchTap={this.deleteUrl}>
                            <Delete />
                        </FloatingActionButton>
                      </div>
                    }

                    {this.renderSubmitButton()}

                </div>
            </div>
        );
    }
}