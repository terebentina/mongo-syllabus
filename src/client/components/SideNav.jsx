import React from 'react';
import { pacomoDecorator } from '../utils/pacomo';
import { connect } from 'react-redux';
import { selectDb, selectCollection, fetchCollections } from '../actions';
import Tap from './Tappable.jsx';
import shouldPureComponentUpdate from 'react-pure-render/function';

@pacomoDecorator
class SideNav extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.array.isRequired,
		collections: React.PropTypes.array.isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedDb !== this.props.selectedDb) {
			nextProps.dispatch(fetchCollections(nextProps.selectedDb));
		}
	}

	shouldComponentUpdate = shouldPureComponentUpdate;

	onDbSelect(e) {
		e.preventDefault();
		this.props.dispatch(selectDb(e.target.value));
	}

	onCollectionSelect(collection, e) {
		e.preventDefault();
		this.props.dispatch(selectCollection(collection));
	}

	render() {
		return (
			<nav>
				<button>Connect</button>

				<div>
					<h3>Databases:</h3>
					<select value={this.props.selectedDb} onChange={this.onDbSelect.bind(this)}>
						<option value=""></option>
						{this.props.databases.map((db, i) => <option key={`db_${i}`} value={db.name}>{db.name}</option>)}
					</select>
				</div>

				<div>
					<h3>Collections</h3>
					{this.props.collections.map((collection, i) => <Tap key={`col_${i}`} onClickTap={this.onCollectionSelect.bind(this, collection)}>{collection}</Tap>)}
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	const { selectedDb, databases, selectedCollection, collections } = state || {selectedDb: '', databases: [], selectedCollection: '', collections: []};
	return {selectedDb, databases, selectedCollection, collections};
}

export default connect(mapStateToProps)(SideNav);
