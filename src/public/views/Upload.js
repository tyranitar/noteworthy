import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Styles from '../js/styles';
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
        }

        console.log(this.state);

        return (
            <div style={ Styles.layoutStyle }>
                <div style={ Styles.fullWidth }>
                    <div style={ Styles.containerStyle }>
     					<input type="file" name="audioUpload" id="audioUpload" accept="audio/*" onChange={(evt)=>{this.setState({url: evt.target.files[0].path})}} />
                    </div>

                    {this.state.url && 
                      
                      <div style ={ Styles.audioTrackContainer }>
                        <audio id = "audioTrack" controls>
                          <source src = {this.state.url} />
                        </audio>
                        <FloatingActionButton style={ Styles.btnSmallAudio } iconStyle={ Styles.iconSmall } backgroundColor={ Styles.white } onTouchTap={this.deleteUrl}>
                            <Delete />
                        </FloatingActionButton>
                      </div>
                    }

                </div>
            </div>
        );
    }
}