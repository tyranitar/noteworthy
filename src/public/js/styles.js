import { grey500, tealA400, white } from 'material-ui/styles/colors';

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
	    left: '65%',
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
		margin: '25px',
	    padding: '25px',
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
    }
}

export default styles