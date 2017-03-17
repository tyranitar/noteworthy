import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Mic from 'material-ui/svg-icons/av/mic';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import { grey500, tealA400, white } from 'material-ui/styles/colors';

const layoutStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center'
};

const fullWidth = {
    width: '100%',
    height: '100%'
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

const audioTrackContainerStyle = {
  display: 'flex',
  'paddingTop': '25px',
  justifyContent: 'center',
  position: 'relative'
}

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

const buttonStyle2 = {
    margin: '0px',
    padding: '5px',
    position: 'absolute',
    left: '65%',
    border: `2px solid ${ tealA400 }`
};

const iconStyle2 = {
    width: '25px',
    height: '25px',
    fill: tealA400
};

const buttonStyle3 = {
    margin: '10px',
    padding: '5px',
    border: `2px solid ${ tealA400 }`
};

const iconStyle3 = {
    width: '50px',
    height: '50px',
    fill: tealA400
};

export default class Index extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div style={ layoutStyle }>
                <div style={ fullWidth }>
                    <div style={ containerStyle }>
                        <span style={ headerStyle1 }>Note</span><span style={ headerStyle2 }>worthy</span>
                    </div>
                    <div style={ containerStyle }>
                        <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white } onTouchTap={()=> {this.props.router.push('/record')}}>
                            <Mic />
                        </FloatingActionButton>

                        <FloatingActionButton style={ buttonStyle } iconStyle={ iconStyle } backgroundColor={ white }>
                            <FileUpload />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }
}