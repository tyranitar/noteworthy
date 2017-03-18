import { grey500, tealA400, white } from 'material-ui/styles/colors';

const margin = 20;
const buttonSize = 150;
const iconSize = 120;
const padding = (buttonSize - iconSize) / 2;

export default {

	'white': white,

	'layoutStyle': {
		height: '100%',
	    display: 'flex',
	    alignItems: 'center'
	},
	
	hiddenFileInput: {
		display: 'none'
	},

	'fullWidth': {
		width: '100%',
    	height: '100%'
	},

	imageUpload: {
		display: 'none'
	},

	'btnLarge': {
		marginTop: `${ margin }px`,
        marginLeft: `${ margin }px`,
        marginRight: `${ margin }px`,
        width: `${ buttonSize }px`,
        height: `${ buttonSize }px`,
        padding: `${ padding }px`
	},

	'containerStyle': {
		display: 'flex',
    	justifyContent: 'center'
	},

	'iconLarge': {
		width: '100px',
    	height: '100px',
    	fill: tealA400
	},

	'uploadCaption': {
		fontWeight: 'bold',
        fontSize: '40px',
        color: grey500,
        textAlign: 'center'
	},

	'uploadContainer': {
		width: '100px',
	    height: '100px',
	    position: 'absolute',
	    top:0,
	    bottom: 0,
	    left: 0,
	    right: 0,
	    margin: 'auto'
	},

	'audioTrackContainer': {
    	display: 'flex',
		'paddingTop': '25px',
		justifyContent: 'center',
		position: 'relative'
    },

    'btnSmallAudio': {
		margin: '0px',
	    padding: '5px',
	    position: 'absolute',
	    left: '67%',
	    border: `2px solid ${ tealA400 }`
	},

	'iconSmall': {
		width: '25px',
    	height: '25px',
    	fill: tealA400
    }
}