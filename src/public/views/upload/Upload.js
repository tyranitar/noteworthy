import React from 'react';
import IconButton from 'material-ui/IconButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Styles from './styles';
import Delete from 'material-ui/svg-icons/action/delete';

export default class Upload extends React.Component {

	constructor() {
		super();

		this.state = {
			url : ''
		}

		this.deleteUrl = () => {
			this.setState({url: ''});
		}
   	}

    render() {

        const audioTrack = document.getElementById("audioTrack");
        
        if (audioTrack) {
            audioTrack.load();
        };

        return (
            <div style={ Styles.layoutStyle }>
                <div style={ Styles.fullWidth }>
                    <div style={ Styles.uploadContainer }>
                        <IconButton style={ Styles.btnLarge } iconStyle={ Styles.iconLarge } backgroundColor={ Styles.white } onClick={()=>{document.getElementById('audioUpload').click()}}>
                            <FileUpload />
                        </IconButton>
                        <input type="file" name="audioUpload" id="audioUpload" style={ Styles.hiddenFileInput } accept="audio/*" onChange={(evt)=>{this.setState({url: evt.target.files[0].path})}} />
                    </div>

                    {this.state.url && 
                      <div style ={ Styles.audioTrackContainer }>
                        <audio id = "audioTrack" controls>
                          <source src = {this.state.url} />
                        </audio>
                        <IconButton style={ Styles.btnSmallAudio } iconStyle={ Styles.iconSmall } backgroundColor={ Styles.white } onTouchTap={this.deleteUrl}>
                            <Delete />
                        </IconButton>
                      </div>
                    }
                </div>
            </div>
        );
    }
}