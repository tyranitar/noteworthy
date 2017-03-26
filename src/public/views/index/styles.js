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

    spanStyle: {
        display: 'block',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        color: grey500
    }
};