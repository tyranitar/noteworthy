import React from 'react';
import IconButton from 'material-ui/IconButton';
import Mic from 'material-ui/svg-icons/av/mic';
import Stop from 'material-ui/svg-icons/av/stop';
import Pause from 'material-ui/svg-icons/av/pause';
import Delete from 'material-ui/svg-icons/action/delete';
import Resume from 'material-ui/svg-icons/av/play-arrow';
import Recorder from 'react-recorder'
import fs from 'fs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/av/skip-next';
import styles from './styles';
import sharedStyles from '../../styles/index';

const mediumIconProps = {
	style: styles.btnMed, 
	iconStyle: styles.iconMed, 
	backgroundColor: sharedStyles.white
}

const largeIconProps = {
	style: styles.btnLarge,
	iconStyle: styles.iconLarge, 
	backgroundColor: sharedStyles.white
}

const smallIconProps = {
	style: styles.btnSmallAudio,
	iconStyle: styles.iconSmall, 
	backgroundColor: sharedStyles.white
}

export default class Record extends React.Component {

	constructor() {

		super();

		this.state = {
	        playing: false,
	        dialogOpen: false,
	        text: '',
	        paused: false
	    }

	    this.onStop = (blob) => {
	        this.setState({blob, dialogOpen: true});
	    }

	    this.onCancel = () => {
	        this.setState({dialogOpen: false});
	    }

	    this.deleteUrl = () => {
	        fs.unlink(this.url).then(()=> {
	        	this.url = '';
	        });
	    }

	    this.onSuccessSubmit = () => {

	        const reader = new FileReader;
	       	const blob = this.state.blob;

	        reader.onload = () => {
	            const blobAsDataUrl = reader.result;
	            const base64 = blobAsDataUrl.split(',')[1];
	            const buf = new Buffer(base64, 'base64');
	            const filePath = '../temp/' + this.state.text + '.wav'
	            fs.writeFile(filePath, buf, (err) => {
	                if (err) {
	                    console.error(err);
	                } else {
	                	this.url = filePath;
	                    this.setState({dialogOpen: false});
	                }
	            }) 
	        }
	        reader.readAsDataURL(blob);
	    }

	    this.startRecorder = () => {
	        if (this.state.paused) {
	            this.refs.Recorder.resume();
	            this.node.connect(this.audioCtx.destination);
	            this.setState({playing: true, paused: false})
	        } else {
	            this.refs.Recorder.start();
	        }
	    }

	    this.start = () => {
	    	this.node.connect(this.audioCtx.destination);
	    	this.setState({playing: true});
	    }

	    this.stop = () => {
	    	const ctx = document.getElementById("mic_activity").getContext("2d");
	    	ctx.clearRect(0, 0, 500, 150);
	    	this.node.disconnect();
	    	this.refs.Recorder.stop();
	    	this.setState({playing: false})
	    }

	    this.pause = () => {
	    	this.node.disconnect();
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

		    this.node = javascriptNode;
		    this.audioCtx = audioCtx;
   	 	}

   	 	this.onSuccessSubmit.bind(this);
   	 	this.onCancel.bind(this);
   	}

   	renderStopOrPauseOptions() {
        if (this.state.playing) {
            return (
                <div>
                    <IconButton { ...largeIconProps } onClick={this.stop}>
                        <Stop />
                    </IconButton>
                    
                    <IconButton { ...largeIconProps } onClick={this.pause}>
                        <Pause />
                    </IconButton>
                </div>
            )
        }
    }

    renderSubmitButton() {
        if (!this.state.playing && this.url) {
            return (
            	<div>
	                <div style = {sharedStyles.containerStyle} >
	                	<IconButton { ...mediumIconProps } onClick={()=>{this.props.router.push('/sheet')}}>
	                        <Next />
	                    </IconButton>
	                </div>
	                <div style = {sharedStyles.containerStyle}>
                    	<span style={styles.successMessage}>Translate your audio file now!</span>
                    </div>
            	</div>
            )
        }
    }

    renderResumeOrPlayOptions() {
    	return this.state.paused ? <Resume/> : <Mic/>
    }

    render() {

    	const dialogActions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.onCancel}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onClick={this.onSuccessSubmit}
          />
        ];

        const audioTrack = document.getElementById("audio-track");
        
        if (audioTrack) {
            audioTrack.load();
        }

        return (
            <div style={ sharedStyles.layoutStyle }>
                <div style={ sharedStyles.fullWidth }>

                	<div style={ sharedStyles.containerStyle }>
                        <span style={ styles.recordTitle }>Record Here!</span>
                    </div>

                    <div style ={sharedStyles.containerStyle}> 
	                    {(!this.state.playing && !this.state.paused) && 
                        	<span style={styles.recordCaption}>Press the button below to begin recording.</span>
	                    }
                    </div>

                    <canvas id="mic_activity" style={styles.audioCanvas}></canvas>

                    <div style={ sharedStyles.containerStyle }>
                        <Recorder ref='Recorder' onStop={this.onStop} blobOpts={{type: 'audio/wav'}} onStart ={this.start} gotStream={this.getStream}/>

                        {!this.state.playing &&
                            <IconButton { ...largeIconProps } onClick={this.startRecorder}>
                                {this.renderResumeOrPlayOptions()}
                            </IconButton>
                        } 

                        <Dialog title={this.props.title} actions={dialogActions} title="Enter your file name" modal={true} open={this.state.dialogOpen}>
                        	<label htmlFor ='fileName'>File Name</label>
                         	<input type = "text" onChange={(evt)=>this.setState({text: evt.currentTarget.value})} id='fileName'/>
                        </Dialog>

                        {this.renderStopOrPauseOptions()}
                    </div>

                    {this.url && 
                      
                      <div style ={ styles.audioTrackContainer }>
                        <audio id = "audio-track" controls>
                          <source src = {'../' + this.url} />
                        </audio>
                        <IconButton { ...smallIconProps} onClick={this.deleteUrl}>
                            <Delete />
                        </IconButton>
                      </div>
                    }

                    {this.renderSubmitButton()}

                </div>
            </div>
        );
    }
}