import React from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './PageMessage.scss';

const duration = 4000;

export class PageMessage extends React.Component {
	static propTypes = {
		message: React.PropTypes.object,
		onHide: React.PropTypes.func.isRequired,
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.message !== this.props.message && nextProps.message !== null) {
			setTimeout(this.props.onHide, duration);
		}
	};

	render() {
		if (this.props.message) {
			return <div className={styles[`page-message--${this.props.message.type}`]}>{this.props.message.message}</div>;
		}
		return false;
	}
}

export default PageMessage;
