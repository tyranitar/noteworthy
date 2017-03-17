import React from 'react';
import IconButton from 'material-ui/IconButton';
import Mic from 'material-ui/svg-icons/av/mic';
import Stop from 'material-ui/svg-icons/av/stop';
import Pause from 'material-ui/svg-icons/av/pause';
import Delete from 'material-ui/svg-icons/action/delete';
import Resume from 'material-ui/svg-icons/av/play-arrow';
import Recorder from 'react-recorder'
import fs from 'fs';
import DialogBox from '../../components/DialogBox';
import FlatButton from 'material-ui/FlatButton';
import Next from 'material-ui/svg-icons/av/skip-next';
import styles from './styles';
import sharedstyles from '../../styles/index';

const mediumIconProps = {
	style: styles.btnMed, 
	iconStyle: styles.iconMed, 
	backgroundColor: sharedstyles.white
}

const largeIconProps = {
	style: styles.btnLarge,
	iconStyle: styles.iconLarge, 
	backgroundColor: sharedstyles.white
}

const smallIconProps = {
	style: styles.btnSmallAudio,
	iconStyle: styles.iconSmall, 
	backgroundColor: sharedstyles.white
}

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
        if (!this.state.playing && this.state.url) {
            return (
            	<div>
	                <div style = {sharedstyles.containerStyle} >
	                	<IconButton { ...mediumIconProps } onClick={()=>{this.props.router.push('/sheet')}}>
	                        <Next />
	                    </IconButton>
	                </div>
	                <div style = {sharedstyles.containerStyle}>
                    	<span style={styles.successMessage}>Translate your audio file now!</span>
                    </div>
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
            <div style={ sharedstyles.layoutStyle }>
                <div style={ sharedstyles.fullWidth }>

                	<div style={ sharedstyles.containerStyle }>
                        <span style={ styles.recordTitle }>Record Here!</span>
                    </div>

                    <div style ={sharedstyles.containerStyle}> 
	                    {(!this.state.playing && !this.state.paused) && 
                        	<span style={styles.recordCaption}>Press the button below to begin recording.</span>
	                    }
                    </div>

                    <canvas id="mic_activity" style={styles.audioCanvas}></canvas>

                    <div style={ sharedstyles.containerStyle }>
                        <Recorder ref='Recorder' onStop={this.onStop} blobOpts={{type: 'audio/mp3'}} onStart ={this.start} gotStream={this.getStream}/>

                        {!this.state.playing &&
                            <IconButton { ...largeIconProps } onClick={this.startRecorder}>
                                {this.renderResumeOrPlayOptions()}
                            </IconButton>
                        } 

                        <DialogBox ref='Dialog' actions={dialogActions} title='Enter a name for your submission' open={this.state.dialogOpen}>
                          <label htmlFor ='fileName'>File Name</label>
                          <input type = "text" onChange={this.onChangeText} id='fileName'/>
                        </DialogBox>


                        {this.renderStopOrPauseOptions()}
                    </div>

                    {this.state.url && 
                      
                      <div style ={ styles.audioTrackContainer }>
                        <audio id = "audioTrack" controls>
                          <source src = {'../' + this.state.url} />
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