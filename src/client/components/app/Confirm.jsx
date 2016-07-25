import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

export class Confirm extends Component {
	static propTypes = {
		message: PropTypes.string,
		fn: PropTypes.func,
		dispatch: PropTypes.func.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		if (this.props.message && this.props.fn) {
			if (confirm(this.props.message)) {
				this.props.dispatch(this.props.fn());
			}
		}
		return null;
	}
}


function mapStateToProps(state) {
	return state.confirmation || {};
}

export default connect(mapStateToProps)(Confirm);
