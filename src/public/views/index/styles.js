import { grey500, tealA400 } from 'material-ui/styles/colors';

export default {
    layoutStyle: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },

    fullWidth: {
        width: '100%'
    },

    headerStyle1: {
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
        fontSize: '75px',
        color: grey500
    },

    headerStyle2: {
        fontFamily: 'Ubuntu',
        fontWeight: 'bold',
        fontSize: '75px',
        color: tealA400
    },

    containerStyle: {
        display: 'flex',
        justifyContent: 'center'
    },

    buttonStyle: {
        margin: '25px',
        padding: '25px',
        border: `5px solid ${ tealA400 }`,
        cursor: 'pointer'
    },

    iconStyle: {
        width: '100px',
        height: '100px',
        fill: tealA400
    }
};