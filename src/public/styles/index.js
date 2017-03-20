import { grey300, grey500, tealA400, white } from 'material-ui/styles/colors';

const marginLarge = 20;
const buttonSizeLarge = 150;
const iconSizeLarge = 120;
const marginMedium = 10;
const buttonSizeMedium = 75
const iconSizeMedium = 60;

const paddingLarge = (buttonSizeLarge - iconSizeLarge) / 2;
const paddingMedium = (buttonSizeMedium - iconSizeMedium) / 2;

export default {

    'white': white,
    'grey500': grey500,
    'tealA400': tealA400,
    'grey300': grey300,

    layoutStyle: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },

    fullWidth: {
        width: '100%'
    },

    containerStyle: {
        display: 'flex',
        justifyContent: 'center'
    },

    modalStyle: {
        width: '305px'
    },

    largeCaption: {
        fontWeight: 'bold',
        fontSize: '75px',
        color: grey500,
        textAlign: 'center'
    },

    subtitleCaption: {
        fontSize: '22px',
        color: grey500,
        textAlign: 'center'
    },

    audioTrackContainer: {
        display: 'flex',
        'paddingTop': '25px',
        justifyContent: 'center',
        position: 'relative'
    },

    btnSmallAudio: {
        margin: '0px',
        padding: '5px',
        position: 'absolute',
        left: '70%',
        borderRadius: '50%',
        border: `2px solid ${ tealA400 }`
    },

    iconSmall: {
        width: '25px',
        height: '25px',
        fill: tealA400
    },

    btnMed: {
        marginTop: `${ marginMedium }px`,
        marginLeft: `${ marginMedium }px`,
        marginRight: `${ marginMedium }px`,
        width: `${ buttonSizeMedium }px`,
        height: `${ buttonSizeMedium }px`,
        padding: `${ paddingMedium }px`,
        margin: '25px',
        borderRadius: '50%',
        border: `5px solid ${ tealA400 }`
    },

    iconMed: {
        width: '50px',
        height: '50px',
        fill: tealA400
    },

    btnLarge: {
        marginTop: `${ marginLarge }px`,
        marginLeft: `${ marginLarge }px`,
        marginRight: `${ marginLarge }px`,
        width: `${ buttonSizeLarge }px`,
        height: `${ buttonSizeLarge }px`,
        padding: `${ paddingLarge }px`,
        margin: '25px',
        borderRadius: '50%',
        border: `5px solid ${ tealA400 }`
    },

    iconLarge: {
        width: '100px',
        height: '100px',
        fill: tealA400
    },

    tooltipIcon: {
        top: '100%',
        left: '25%'
    },

    audio: {
        margin: '12px'
    }
    // Shared styles.
};