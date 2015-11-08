import React from 'react';
//import { pacomoDecorator } from './utils/pacomo';
import { connect } from 'react-redux';
import { selectDb, selectCollection, fetchCollections, fetchDatabasesIfNeeded, hideMessage } from './actions';
import SideNav from './components/SideNav.jsx';
import Main from './components/Main.jsx';
import PageMessage from './components/PageMessage.jsx';

import './app.scss';

const App = React.createClass({
	displayName: 'App',
	propTypes: {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.array.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.array.isRequired,
		isFetching: React.PropTypes.bool.isRequired,
		message: React.PropTypes.object,
		dispatch: React.PropTypes.func.isRequired,
	},
	componentDidMount() {
		this.props.dispatch(fetchDatabasesIfNeeded());
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedDb !== this.props.selectedDb) {
			nextProps.dispatch(fetchCollections(nextProps.selectedDb));
		}
	},
	onDbSelect(db) {
		console.log('App.onDbSelect');
		this.props.dispatch(selectDb(db));
	},
	onCollectionSelect(collection) {
		console.log('App.onCollectionSelect', collection);
		this.props.dispatch(selectCollection(collection));
	},
	hidePageMessage() {
		this.props.dispatch(hideMessage());
	},
	render() {
		return (
			<div className="app">
				<PageMessage message={this.props.message} onHide={this.hidePageMessage} />
				<header>header</header>
				<div className="body">
					<Main database={this.props.selectedDb} collection={this.props.selectedCollection} />
					<SideNav selectedDb={this.props.selectedDb} databases={this.props.databases} onDbSelect={this.onDbSelect} selectedCollection={this.props.selectedCollection} collections={this.props.collections} onCollectionSelect={this.onCollectionSelect} />
				</div>
				<footer>footer</footer>
			</div>
		);
	},
});

function mapStateToProps(state) {
	const { selectedDb, databases, selectedCollection, collections, isFetching, message } = state || {selectedDb: '', databases: [], selectedCollection: '', collections: [], isFetching: false, message: null};
	return {selectedDb, databases, selectedCollection, collections, isFetching, message};
}

//export default pacomoDecorator(App);
export default connect(mapStateToProps)(App);
