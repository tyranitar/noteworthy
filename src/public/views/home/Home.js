import React, { Component } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import sharedStyles from '../../styles/index';

export default class Home extends Component {
	render() {
		const currentLocation = this.props.location.pathname;
		const divStyle = ('/' == currentLocation) ? { padding: '50px 0 0' } : { padding: 0 };

		return(
			<div style={ divStyle } >
				{('/' != currentLocation) &&
					<Link to='/'>
						<IconButton iconStyle={ sharedStyles.iconMed } >
							<ActionHome />
						</IconButton>
					</Link>
				}

				{ this.props.children }
			</div>
		);
	}
}