import React from 'react';
//import { pacomoDecorator } from './utils/pacomo';
import { connect } from 'react-redux';
import { selectDb, selectCollection, fetchCollectionsIfNeeded, fetchDatabasesIfNeeded } from './actions';
import SideMenu from './components/SideMenu.jsx';
import Main from './components/Main.jsx';

import './app.scss';

const App = React.createClass({
	displayName: 'App',
	propTypes: {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.array.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		collections: React.PropTypes.array.isRequired,
		isFetching: React.PropTypes.bool.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	},
	componentDidMount() {
		this.props.dispatch(fetchDatabasesIfNeeded());
	},
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedDb !== this.props.selectedDb) {
			nextProps.dispatch(fetchCollectionsIfNeeded(nextProps.selectedDb));
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
	render() {
		return (
			<div>
				<header></header>
				<SideMenu selectedDb={this.props.selectedDb} databases={this.props.databases} onDbSelect={this.onDbSelect} selectedCollection={this.props.selectedCollection} collections={this.props.collections} onCollectionSelect={this.onCollectionSelect} />
				<Main />
			</div>
		);
	},
});

function mapStateToProps(state) {
	const { selectedDb, databases, selectedCollection, collections, isFetching } = state || {selectedDb: '', databases: [], selectedCollection: '', collections: [], isFetching: false};
	return {selectedDb, databases, selectedCollection, collections, isFetching};
}

//export default pacomoDecorator(App);
export default connect(mapStateToProps)(App);
