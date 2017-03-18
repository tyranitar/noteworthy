import React from 'react';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import styles from './styles';
import sharedStyles from '../../styles/index';
import Delete from 'material-ui/svg-icons/action/delete';

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

        return (
            <div style={ sharedStyles.layoutStyle }>
                <div style={ styles.uploadPageWidthAndHeight }>
                    <div style={ sharedStyles.containerStyle }>
                        <span style={ sharedStyles.subtitleCaption }>Upload your file below.</span>
                    </div>
                    <div style={ styles.uploadContainer }>
                        <IconButton style={ styles.btnLarge } iconStyle={ styles.iconLarge } backgroundColor={ sharedStyles.white } onClick={()=>{document.getElementById('audioUpload').click()}}>
                            <FileUpload />
                        </IconButton>
                        <input type="file" name="audioUpload" id="audioUpload" style={ styles.hiddenFileInput } accept="audio/*" onChange={(evt)=>{this.setState({url: evt.target.files[0].path})}} />
                    </div>

                    {this.state.url && 
                      <div style ={ styles.audioTrackContainer }>
                        <audio id = "audioTrack" controls>
                          <source src = {this.state.url} />
                        </audio>
                        <IconButton style={ styles.btnSmallAudio } iconStyle={ styles.iconSmall } backgroundColor={ sharedStyles.white } onTouchTap={this.deleteUrl}>
                            <Delete />
                        </IconButton>
                      </div>
                    }
                </div>
            </div>
        );
    }
}