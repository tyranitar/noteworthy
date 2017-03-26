import React from 'react';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import styles from './styles';
import sharedStyles from '../../styles/index';
import Delete from 'material-ui/svg-icons/action/delete';
import Next from 'material-ui/svg-icons/av/skip-next';

import octaveClientConnection from '../../octave-client-connection';

export default class Upload extends React.Component {

	constructor() {
		super();

		this.state = {
			url : ''
		}

        this.deleteUrl = this.deleteUrl.bind(this);
   	}

    deleteUrl() {
        this.setState({url: ''});
    }

    render() {

        const audioTrack = document.getElementById("audioTrack");

        if (audioTrack) {
            audioTrack.load();
        };

		const onClick = () => {
			octaveClientConnection.then((octaveClient) => {
				octaveClient.addListener((chunk) => {
					const outputLocation = new TextDecoder("utf-8").decode(chunk);
					this.props.router.push(`/sheet?url=${ outputLocation }`);
				});

				octaveClient.send(this.state.url);
			})
		};

        return (
            <div style={ sharedStyles.layoutStyle }>
                <div style={ styles.uploadPageWidthAndHeight }>
                    <div style={ sharedStyles.containerStyle }>
                        <span style={ sharedStyles.largeCaption }>
                            <span style={{ color: sharedStyles.tealA400 }}>Upload </span>
                            Here!
                        </span>
                    </div>
                    <div style={ sharedStyles.containerStyle }>
                        <span style={ sharedStyles.subtitleCaption }>
                            { !this.state.url
                                ? 'Press the button below to upload your file'
                                : 'Press the button below to convert into sheet music' }
                        </span>
                    </div>
                    { !this.state.url &&
                        <div style={ styles.uploadContainer }>
                            <IconButton style={ sharedStyles.btnLarge }
                                        iconStyle={ sharedStyles.iconLarge }
                                        tooltip="Upload a file"
                                        tooltipStyles={ sharedStyles.tooltipIcon }
                                        onClick={()=>{document.getElementById('audioUpload').click()}} >
                                <FileUpload />
                            </IconButton>
                            <input type="file" name="audioUpload" id="audioUpload" style={ styles.hiddenFileInput } accept="audio/*" onChange={(evt)=>{this.setState({url: evt.target.files[0].path})}} />
                        </div>
                    }

                    {this.state.url &&
                        <div>
                            <div style={ sharedStyles.audioTrackContainer }>
                                <audio id = "audioTrack" controls style={ sharedStyles.audio }>
                                    <source src = {this.state.url} />
                                </audio>
                                <IconButton style={ sharedStyles.btnSmallAudio }
                                            iconStyle={ sharedStyles.iconSmall }
                                            tooltip="Delete file selection"
                                            tooltipStyles={ sharedStyles.tooltipIcon }
                                            onClick={this.deleteUrl}>
                                    <Delete />
                                </IconButton>
                            </div>
                            <div style = {sharedStyles.containerStyle} >
                                <IconButton style={ sharedStyles.btnLarge }
                                            iconStyle={ sharedStyles.iconLarge }
                                            tooltip="Convert"
                                            tooltipStyles={ sharedStyles.tooltipIcon }
                                            onClick={ onClick }>
                                    <Next />
                                </IconButton>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}