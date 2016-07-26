import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Confirm from './Confirm';

function ConfirmConnector(props) {
	const { message, fn } = props;
	if (message && fn) {
		return <Confirm {...props} />;
	}

	return null;
}

ConfirmConnector.propTypes = {
	message: PropTypes.string,
	fn: PropTypes.func,
};

function mapStateToProps(state) {
	return state.confirmation || {};
}

export default connect(mapStateToProps)(ConfirmConnector);
