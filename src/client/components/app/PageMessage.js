import React, { Component, PropTypes } from 'react';
import { pageMessageShape } from '../../store/shapes';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './PageMessage.css';

const duration = 4000;

export class PageMessage extends Component {
	static propTypes = {
		message: pageMessageShape,
		onHide: PropTypes.func.isRequired,
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.message !== this.props.message && nextProps.message !== null) {
			setTimeout(this.props.onHide, duration);
		}
	};

	render() {
		const { message } = this.props;

		if (message) {
			return <div className={styles[`page-message--${message.type}`]}>{message.message}</div>;
		}
		return false;
	}
}

export default PageMessage;
