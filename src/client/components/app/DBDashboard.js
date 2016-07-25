import React, { Component, PropTypes } from 'react';

class DBDashboard extends Component {
	static propTypes = {
		db: PropTypes.string.isRequired,
	};

	render() {
		return (
			<div>DB Dashboard: {this.props.db}</div>
		);
	}
}

export default DBDashboard;
