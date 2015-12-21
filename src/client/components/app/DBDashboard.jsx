import React from 'react';

class DBDashboard extends React.Component {
	static propTypes = {
		db: React.PropTypes.string.isRequired,
	};

	render() {
		return (
			<div>DB Dashboard: {this.props.db}</div>
		);
	}
}

export default DBDashboard;
