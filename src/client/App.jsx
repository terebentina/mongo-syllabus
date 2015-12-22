import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import Dashboard from './components/app/Dashboard.jsx';
import DBDashboard from './components/app/DBDashboard.jsx';
import Collection from './components/app/Collection.jsx';
import SideNav from './components/app/SideNav.jsx';
import PageMessage from './components/app/PageMessage.jsx';

import './app.scss';

class App extends React.Component {
	static propTypes = {
		message: React.PropTypes.object,
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	componentDidMount() {
		this.props.dispatch(fetchDatabasesIfNeeded());
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		let content;
		if (!this.props.selectedDb) {
			content = <Dashboard />;
		} else if (!this.props.selectedCollection) {
			content = <DBDashboard db={this.props.selectedDb} />;
		} else {
			content = <Collection />;
		}
		return (
			<div className="app">
				<PageMessage message={this.props.message} onHide={() => this.props.dispatch(hideMessage())} />
				<header className="row">
					<span className="title col">Mongo Manager</span>
				</header>
				<main>
					{content}
				</main>
				<SideNav />
				<footer>footer</footer>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		message: state.message || null,
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
	};
}

export default connect(mapStateToProps)(App);
