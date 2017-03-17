import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Mic from 'material-ui/svg-icons/av/mic';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import { white } from 'material-ui/styles/colors';

import styles from './styles';

const iconProps = {
    style: styles.buttonStyle,
    iconStyle: styles.iconStyle,
    backgroundColor: white
};

export default class Index extends React.Component {
    render() {
        return (
            <div style={ styles.layoutStyle }>
                <div style={ styles.fullWidth }>
                    <div style={ styles.containerStyle }>
                        <span style={ styles.headerStyle1 }>Note</span><span style={ styles.headerStyle2 }>worthy</span>
                    </div>

                    <div style={ styles.containerStyle }>
                        <FloatingActionButton {...iconProps}>
                            <Mic />
                        </FloatingActionButton>

                        <FloatingActionButton {...iconProps}>
                            <FileUpload />
                        </FloatingActionButton>
                    </div>
                </div>
            </div>
        );
    }
}