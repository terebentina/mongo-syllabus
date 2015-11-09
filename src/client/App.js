import React from 'react';
import { connect } from 'react-redux';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import SideNav from './components/SideNav.jsx';
import Main from './components/Main.jsx';
import PageMessage from './components/PageMessage.jsx';

import './app.scss';

const App = React.createClass({
	displayName: 'App',
	propTypes: {
		message: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
	},
	componentDidMount() {
		this.props.dispatch(fetchDatabasesIfNeeded());
	},
	render() {
		return (
			<div className="app">
				<PageMessage message={this.props.message} onHide={() => this.props.dispatch(hideMessage())} />
				<header>header</header>
				<div className="body">
					<Main />
					<SideNav />
				</div>
				<footer>footer</footer>
			</div>
		);
	},
});

function mapStateToProps(state) {
	return {
		message: state.message || null,
	};
}

export default connect(mapStateToProps)(App);
