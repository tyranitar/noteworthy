
export default {

	'white': white,

	'layoutStyle': {
		height: '100%',
	    display: 'flex',
	    alignItems: 'center'
	},
	
	'fullWidth': {
		width: '100%',
    	height: '100%'
	},

	'uploadContainer': {
		margin: 0 auto
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