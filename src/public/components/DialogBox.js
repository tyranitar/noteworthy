import React from 'react';
import Dialog from 'material-ui/Dialog';

export default class DialogBox extends React.Component {
    constructor() {
        super();
    }

    render() {
    	return (
	      <div>
	        <Dialog
	          title={this.props.title}
	          actions={this.props.actions}
	          modal={true}
	          open={this.props.open}
	        >
	        <div>
	        	{this.props.children}
	        </div>
	        </Dialog>
	      </div>
	    );
    }
}