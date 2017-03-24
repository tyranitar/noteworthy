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
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import octaveClientConnection from '../../octave-client-connection';

const mediumIconProps = {
	style: sharedStyles.btnMed,
	iconStyle: sharedStyles.iconMed,
	backgroundColor: sharedStyles.white
}

const largeIconProps = {
	style: sharedStyles.btnLarge,
	iconStyle: sharedStyles.iconLarge,
	backgroundColor: sharedStyles.white,
    tooltipStyles: sharedStyles.tooltipIcon
}

const smallIconProps = {
	style: sharedStyles.btnSmallAudio,
    iconStyle: sharedStyles.iconSmall,
    tooltipStyles: sharedStyles.tooltipIcon,
    backgroundColor: sharedStyles.white
}

export default class Record extends React.Component {

	constructor() {

	    super();

	    this.state = {
	        playing: false,
	        dialogOpen: false,
	        text: '',
	        paused: false,
	        snackBarOpen: false,
	        snackBarMessage: ''
	    }

	    this.pause = this.pause.bind(this);
	    this.onSuccessSubmit = this.onSuccessSubmit.bind(this);
	    this.onCancel = this.onCancel.bind(this);
	    this.onStop = this.onStop.bind(this);
	    this.onCancel = this.onCancel.bind(this);
	    this.stop = this.stop.bind(this);
	    this.startRecorder = this.startRecorder.bind(this);
	    this.start = this.start.bind(this);
	    this.deleteUrl = this.deleteUrl.bind(this);
	    this.getStream = this.getStream.bind(this);
	}

   	onSuccessSubmit() {
	    const reader = new FileReader;
	    const blob = this.state.blob;

	    reader.onload = () => {
	        const blobAsDataUrl = reader.result;
	        const base64 = blobAsDataUrl.split(',')[1];
	        const buf = new Buffer(base64, 'base64');
	        const filePath = 'C:/Users/Tyron/Documents/GitHub/personal/noteworthy/temp/' + this.state.text + '.wav'
	        fs.writeFile(filePath, buf, (err) => {
	            if (err) {
	                console.error(err);
	                this.setState({
	                    snackBarOpen: true,
	                    snackBarMessage: err.message || 'Oops! Something went wrong with the audio conversion. Please refresh the page and try again.'
	                })
	            } else {
	                this.url = filePath;
	                this.setState({
	                    dialogOpen: false
	                });
	            }
	        })
	    }
	    reader.readAsDataURL(blob);
	}

	deleteUrl() {
	    fs.unlink(this.url, (err) => {
	        if (err) {
	            this.setState({
	                snackBarOpen: true,
	                snackBarMessage: err.message || 'Error deleting file. Please try again.'
	            });
	        } else {
	            this.setState({
	                snackBarOpen: true,
	                snackBarMessage: 'File has been deleted.'
	            });
	            this.url = '';
	        }
	    });
	}

	start() {
	    this.node.connect(this.audioCtx.destination);
	    this.setState({
	        playing: true
	    });
	}

	startRecorder() {
	    if (this.state.paused) {
	        this.refs.Recorder.resume();
	        this.node.connect(this.audioCtx.destination);
	        this.setState({
	            playing: true,
	            paused: false
	        })
	    } else {
	        this.refs.Recorder.start();
	    }
	}

	stop() {
	    const ctx = document.getElementById("mic_activity").getContext("2d");
	    ctx.clearRect(0, 0, 500, 150);
	    this.node.disconnect();
	    this.refs.Recorder.stop();
	    this.setState({
	        playing: false
	    })
	}

	pause() {
	    this.node.disconnect();
	    this.refs.Recorder.pause();
	    this.setState({
	        playing: false,
	        paused: true
	    })
	}

	getStream(stream) {
	    const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	    const analyser = audioCtx.createAnalyser();
	    const source = audioCtx.createMediaStreamSource(stream);
	    source.connect(analyser);
	    const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

	    analyser.smoothingTimeConstant = 0.3;
	    analyser.fftSize = 1024;

	    analyser.connect(javascriptNode);
	    const ctx = document.getElementById("mic_activity").getContext("2d");
	    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
	    gradient.addColorStop(1, '#000000');
	    gradient.addColorStop(0.75, '#ff0000');
	    gradient.addColorStop(0.25, '#ffff00');
	    gradient.addColorStop(0, '#ffffff');
	    // when the javascript node is called
	    // we use information from the analyzer node
	    // to draw the volume
	    javascriptNode.onaudioprocess = function() {

	        // get the average for the first channel
	        const array = new Uint8Array(analyser.frequencyBinCount);
	        analyser.getByteFrequencyData(array);

	        // clear the current state
	        ctx.clearRect(0, 0, 1000, 325);

	        // set the fill style
	        ctx.fillStyle = gradient;
	        drawSpectrum(array);

	    }

	    function drawSpectrum(array) {
	        for (let i = 0; i < (array.length); i++) {
	            let value = array[i];
	            ctx.fillRect(i * 5, 325 - value, 3, 325);
	        }
	    };

	    this.node = javascriptNode;
	    this.audioCtx = audioCtx;
	}

	onCancel() {
	    this.setState({
	        dialogOpen: false
	    });
	}

	onStop(blob) {
	    this.setState({
	        blob,
	        dialogOpen: true
	    });
	}

   	renderStopOrPauseOptions() {
   		if (this.state.playing) {
            return (
                <div>
                    <IconButton { ...largeIconProps } tooltip="Stop Recording" onClick={this.stop}>
                        <Stop />
                    </IconButton>

                    <IconButton { ...largeIconProps } tooltip="Pause Recording" onClick={this.pause}>
                        <Pause />
                    </IconButton>
                </div>
            )
        }
    }

    renderSubmitButton() {
        if (!this.state.playing && this.url) {
			const onClick = () => {
				octaveClientConnection.then((octaveClient) => {
					octaveClient.addListener((chunk) => {
						console.log(chunk);
						// this.props.router.push('/sheet?hello=world');
					});

					console.log(this.url);

					octaveClient.send(this.url);
				})
			};

            return (
				<div style = {sharedStyles.containerStyle} >
					<IconButton { ...largeIconProps } tooltip="Convert" onClick={ onClick }>
						<Next />
					</IconButton>
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
                        <span style={ sharedStyles.largeCaption }>
                        	<span style={{ color: sharedStyles.tealA400 }}>Record </span>
                        	Here!
                        </span>
                    </div>

                	<div style ={sharedStyles.containerStyle}>
                		<span style={ sharedStyles.subtitleCaption }>
	                		{(!this.url && !this.state.playing && !this.state.paused) && 'Press the button below to begin recording' }
	                    	{(!this.url && this.state.playing) && 'Recording...' }
	                    	{(!this.url && this.state.paused) && 'Paused, press play to resume recording'}
	                    	{(this.url && !this.state.playing) && 'Translate your recording now' }
	                    </span>
                    </div>

	                {!this.url &&
	                    <div style={ sharedStyles.containerStyle }>
	                        <Recorder ref='Recorder' onStop={this.onStop} blobOpts={{type: 'audio/wav'}} onStart ={this.start} gotStream={this.getStream}/>

	                        {!this.state.playing &&
	                            <IconButton { ...largeIconProps } onClick={this.startRecorder}>
	                                {this.renderResumeOrPlayOptions()}
	                            </IconButton>
	                        }

	                        <Dialog title={this.props.title}
	                        		actions={dialogActions}
	                        		contentStyle={ sharedStyles.modalStyle }
	                        		title="Name Your Audio File"
	                        		modal={true}
	                        		open={this.state.dialogOpen}>
	                        	<TextField hintText="Enter your file name here...." onChange={(evt)=>this.setState({text: evt.currentTarget.value})}/>
	                        </Dialog>

	                        {this.renderStopOrPauseOptions()}
	                    </div>
	                }

                    {this.url &&
	                    <div style ={ sharedStyles.audioTrackContainer }>
	                        <audio id = "audio-track" style={ sharedStyles.audio } controls>
	                          <source src = {'../../' + this.url} />
	                        </audio>
	                        <IconButton { ...smallIconProps} tooltip="Delete recording" onClick={this.deleteUrl}>
	                            <Delete />
	                        </IconButton>
	                    </div>
                    }

	                {!this.url &&
	                    <canvas id="mic_activity" style={styles.audioCanvas}></canvas>
	                }

                    {this.renderSubmitButton()}

                    <Snackbar open={this.state.snackBarOpen} message={this.state.snackBarMessage} autoHideDuration={2000} onRequestClose={()=> {this.setState({snackBarOpen: false})}}/>

                </div>
            </div>
        );
    }
}