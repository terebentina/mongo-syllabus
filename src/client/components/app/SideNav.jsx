import React from 'react';
import { connect } from 'react-redux';
import { selectDb, selectCollection, fetchCollections } from '../../actions';
import Tap from '../Tappable.jsx';
import shouldPureComponentUpdate from 'react-pure-render/function';

import './SideNav.scss';

class SideNav extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		databases: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		collections: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
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
			<aside>
				<header>
					<h3>Databases:</h3>
					<div>
						<select value={this.props.selectedDb} onChange={this.onDbSelect.bind(this)}>
							<option value=""></option>
							{this.props.databases.map((db, i) => <option key={`db_${i}`} value={db}>{db}</option>)}
						</select>
						<a href=""><svg className="icon-settings"><use xlinkHref="#icon-settings"></use></svg></a>
					</div>
				</header>

				<nav>
					<h3>Collections</h3>
					{this.props.collections.map((collection, i) => <Tap key={`col_${i}`} onClickTap={this.onCollectionSelect.bind(this, collection)}><svg className="icon-apps"><use xlinkHref="#icon-apps"></use></svg>{collection}</Tap>)}
				</nav>
			</aside>
		);
	}
}

function mapStateToProps(state) {
	const { selectedDb, databases, selectedCollection, collections } = state || { selectedDb: '', databases: [], selectedCollection: '', collections: [] };
	return { selectedDb, databases, selectedCollection, collections };
}

export default connect(mapStateToProps)(SideNav);
