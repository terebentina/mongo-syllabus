import React from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { pacomoDecorator } from '../../utils/pacomo';

import './PageMessage.scss';

const duration = 3000;

const PageMessage = React.createClass({
	displayName: 'PageMessage',
	propTypes: {
		message: React.PropTypes.object,
		onHide: React.PropTypes.func.isRequired,
		className: React.PropTypes.string,
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.message !== this.props.message && nextProps.message !== null) {
			setTimeout(this.props.onHide, duration);
		}
	},
	render() {
		if (this.props.message) {
			return <div className={this.props.message.type}>{this.props.message.message}</div>;
		}
		return false;
	},
});

export default pacomoDecorator(PageMessage);
