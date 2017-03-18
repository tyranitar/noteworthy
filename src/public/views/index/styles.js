import { grey500, tealA400 } from 'material-ui/styles/colors';

const margin = 20;
const buttonSize = 150;
const iconSize = 120;
const padding = (buttonSize - iconSize) / 2;

export default {
    headerStyle1: {
        fontWeight: 'bold',
        fontSize: '75px',
        color: grey500
    },

    headerStyle2: {
        fontWeight: 'bold',
        fontSize: '75px',
        color: tealA400
    },

    buttonStyle: {
        marginTop: `${ margin }px`,
        marginLeft: `${ margin }px`,
        marginRight: `${ margin }px`,
        width: `${ buttonSize }px`,
        height: `${ buttonSize }px`,
        padding: `${ padding }px`
    },

    iconStyle: {
        width: `${ iconSize }px`,
        height: `${ iconSize }px`,
        fill: tealA400
    },

    spanStyle: {
        display: 'block',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        color: grey500
    }
};