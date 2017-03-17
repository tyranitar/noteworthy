import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Mic from 'material-ui/svg-icons/av/mic';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Styles from '../js/styles';

export default class Index extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div style={ Styles.layoutStyle }>
                <div style={ Styles.fullWidth }>
                    <div style={ Sty;es.containerStyle }>
                        <span style={ Styles.headerStyle1 }>Note</span><span style={ Styles.headerStyle2 }>worthy</span>
                    </div>
                    <div style={ Styles.containerStyle }>
                        <FloatingActionButton style={ Styles.btnLarge } iconStyle={ Styles.iconLarge } backgroundColor={ Styles.white } onTouchTap={()=> {this.props.router.push('/record')}}>
                            <Mic />
                        </FloatingActionButton>

                        <FloatingActionButton style={ Styles.btnLarge } iconStyle={ Styles.iconLarge } backgroundColor={ Styles.white }>
                            <FileUpload />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }
}