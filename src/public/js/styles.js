import { grey500, tealA400, white } from 'material-ui/styles/colors';

const margin = 20;
const buttonSize = 150;
const iconSize = 120;
const padding = (buttonSize - iconSize) / 2;

const styles = {
	
	'white': white,
	'grey500': grey500,
	'tealA400': tealA400,

	'layoutStyle': {
		height: '100%',
	    display: 'flex',
	    alignItems: 'center'
	},
	
	'fullWidth': {
		width: '100%',
    	height: '100%'
	},

	'containerStyle': {
		display: 'flex',
    	justifyContent: 'center'
	},

	'headerStyle1': {
		fontFamily: 'Ubuntu',
    	fontWeight: 'bold',
    	fontSize: '75px',
    	color: grey500
    },

    'headerStyle2': {
    	fontFamily: 'Ubuntu',
	    fontWeight: 'bold',
	    fontSize: '75px',
	    color: tealA400
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
    },

	'btnMed': {
	    margin: '10px',
	    padding: '5px',
	    border: `2px solid ${ tealA400 }`
	},

	'iconMed': {
		width: '50px',
	    height: '50px',
	    fill: tealA400
	},

	'btnLarge': {
		marginTop: `${ margin }px`,
        marginLeft: `${ margin }px`,
        marginRight: `${ margin }px`,
        width: `${ buttonSize }px`,
        height: `${ buttonSize }px`,
        padding: `${ padding }px`
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
    }
}

export default styles