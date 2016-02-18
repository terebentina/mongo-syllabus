import React from 'react';
import { connect } from 'react-redux';
import { selectDb, selectAndSearchDocs, fetchCollections, showModal } from '../../actions';
import shouldPureComponentUpdate from 'react-pure-render/function';

import './SideNav.scss';

export class SideNav extends React.Component {
	static propTypes = {
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		databases: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		collections: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		dispatch: React.PropTypes.func.isRequired,
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.selectedDb !== this.props.selectedDb) {
			nextProps.dispatch(fetchCollections(nextProps.selectedDb));
		}
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onDbSelect = (e) => {
		e.preventDefault();
		this.props.dispatch(selectDb(e.target.value));
	};

	onCollectionSelect = (collection) => (e) => {
		e.preventDefault();
		this.props.dispatch(selectAndSearchDocs(collection));
	};

	onAddCollectionClick = (e) => {
		e.preventDefault();
		this.props.dispatch(showModal('CollectionCreate', { db: this.props.selectedDb }));
	};

	render() {
		return (
			<aside>
				<h3>Server:</h3>
				<span className="serverUri">mongodb://192.168.55.103:27017</span>
				<h3>Databases:</h3>
				<div>
					<select value={this.props.selectedDb} onChange={this.onDbSelect}>
						<option value=""></option>
						{this.props.databases.map((db, i) => <option key={`db_${i}`} value={db}>{db}</option>)}
					</select>
					{this.props.selectedDb ? <a href="#"><svg className="icon-settings"><use xlinkHref="#icon-settings"></use></svg></a> : null}
				</div>
				<div className="collections">
					<h4>Collections</h4>
					<a onClick={this.onAddCollectionClick}><svg className="icon-add"><use xlinkHref="#icon-add"></use></svg></a>
				</div>

				<nav>
					{this.props.collections.map((collection, i) => <a key={`col_${i}`} className={collection == this.props.selectedCollection ? 'active' : ''} onClick={this.onCollectionSelect(collection)}><svg className="icon-apps"><use xlinkHref="#icon-apps"></use></svg>{collection}</a>)}
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
