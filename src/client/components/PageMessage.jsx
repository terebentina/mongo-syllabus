import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

const duration = 3000;

const PageMessage = React.createClass({
	propTypes: {
		message: React.PropTypes.object,
		onHide: React.PropTypes.func.isRequired,
		className: React.PropTypes.string,
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.message !== this.props.message && nextProps.message !== null) {
			setTimeout(() => {
				this.props.onHide();
			}, duration);
		}
	},
	render: function() {
		let content = null;
		if (this.props.message) {
			content = <div className={classnames('message', 'message--' + this.props.message.type, this.props.className)}>{this.props.message.message}</div>;
		}
		return (
			<ReactCSSTransitionGroup transitionName="message" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
				{content}
			</ReactCSSTransitionGroup>
		);
	},
});

export default PageMessage;
