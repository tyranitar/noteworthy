import { grey500, tealA400, white } from 'material-ui/styles/colors';

const marginLarge = 20;
const buttonSizeLarge = 150;
const iconSizeLarge = 120;
const marginMedium = 10;
const buttonSizeMedium = 75
const iconSizeMedium = 60;

const paddingLarge = (buttonSizeLarge - iconSizeLarge) / 2;
const paddingMedium = (buttonSizeMedium - iconSizeMedium) / 2;

const styles = {

    'btnSmallAudio': {
        margin: '0px',
        padding: '5px',
        position: 'absolute',
        left: '70%',
        border: `2px solid ${ tealA400 }`
    },

    recordTitle: {
        fontWeight: 'bold',
        fontSize: '75px',
        color: grey500,
        textAlign: 'center'
    },

    successMessage: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: grey500,
        textAlign: 'center'
    },

    recordCaption: {
        fontWeight: 'bold',
        fontSize: '40px',
        color: grey500,
        textAlign: 'center'
    },

    'iconSmall': {
        width: '25px',
        height: '25px',
        fill: tealA400
    },

    'btnMed': {
        marginTop: `${ marginMedium }px`,
        marginLeft: `${ marginMedium }px`,
        marginRight: `${ marginMedium }px`,
        width: `${ buttonSizeMedium }px`,
        height: `${ buttonSizeMedium }px`,
        padding: `${ paddingMedium }px`,
        margin: '25px',
        border: `5px solid ${ tealA400 }`
    },

    'iconMed': {
        width: '50px',
        height: '50px',
        fill: tealA400
    },

    'btnLarge': {
        marginTop: `${ marginLarge }px`,
        marginLeft: `${ marginLarge }px`,
        marginRight: `${ marginLarge }px`,
        width: `${ buttonSizeLarge }px`,
        height: `${ buttonSizeLarge }px`,
        padding: `${ paddingLarge }px`,
        margin: '25px',
        border: `5px solid ${ tealA400 }`
    },

    'iconLarge': {
        width: '100px',
        height: '100px',
        fill: tealA400
    },

    'audioTrackContainer': {
        display: 'flex',
        'paddingTop': '25px',
        justifyContent: 'center',
        position: 'relative'
    },

    'audioCanvas': {
        'paddingLeft': 0,
        'paddingRight': 0,
        'marginLeft': 'auto',
        'marginRight': 'auto',
        'display': 'block',
        'width': '500px',
        'height': '150px'
    }
}

export default styles