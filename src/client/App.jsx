import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fetchDatabasesIfNeeded, hideMessage } from './actions';
import Main from './components/app/Main.jsx';
import SideNav from './components/app/SideNav.jsx';
import PageMessage from './components/app/PageMessage.jsx';

import './app.scss';

class App extends React.Component {
	static propTypes = {
		message: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
		children: React.PropTypes.node,
	};

	componentDidMount() {
		this.props.dispatch(fetchDatabasesIfNeeded());
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	render() {
		return (
			<div className="app">
				<PageMessage message={this.props.message} onHide={() => this.props.dispatch(hideMessage())} />
				<header className="row">
					<span className="title col">Mongo Manager</span>
				</header>
				<div className="body">
					<Main />
					<SideNav />
				</div>
				<footer>footer</footer>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		message: state.message || null,
	};
}

export default connect(mapStateToProps)(App);
