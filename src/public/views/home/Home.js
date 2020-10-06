import React, { Component } from 'react';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import sharedStyles from '../../styles/index';

export default class Home extends Component {
	render() {
		const currentLocation = this.props.location.pathname;
		const divStyle = { height: '100%' };
		const homeLinkStyle = { position: 'absolute' };

		return(
			<div style={ divStyle } >
				{('/' != currentLocation) &&
					<div style={ homeLinkStyle }>
						<Link to='/'>
							<IconButton iconStyle={ sharedStyles.iconMed } >
 								<ActionHome />
 							</IconButton>
						</Link>
					</div>
				}

				{ this.props.children }
			</div>
		);
	}
}