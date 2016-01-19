import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from '../../../../node_modules/react-pure-render/function';

class Confirm extends React.Component {
	static propTypes = {
		// exactly 1 child
		message: React.PropTypes.string,
		fn: React.PropTypes.func,
		dispatch: React.PropTypes.func.isRequired,
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
