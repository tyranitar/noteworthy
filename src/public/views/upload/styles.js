import { grey500, tealA400, white } from 'material-ui/styles/colors';

const margin = 20;
const buttonSize = 150;
const iconSize = 120;
const padding = (buttonSize - iconSize) / 2;

export default {

    hiddenFileInput: {
        display: 'none'
    },

    imageUpload: {
        display: 'none'
    },

    uploadPageWidthAndHeight: {
    	width: '100%',
    	height: '40%'
    },

    btnLarge: {
        marginTop: `${ margin }px`,
        marginLeft: `${ margin }px`,
        marginRight: `${ margin }px`,
        width: `${ buttonSize }px`,
        height: `${ buttonSize }px`,
        padding: `${ padding }px`
    },

    iconLarge: {
        width: '100px',
        height: '100px',
        fill: tealA400
    },

    uploadContainer: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        textAlign: 'center'
    }
}