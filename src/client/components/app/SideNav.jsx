import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectDb, selectAndSearchDocs, fetchCollections, showModal } from '../../actions';
import shouldPureComponentUpdate from 'react-pure-render/function';

import styles from './SideNav.scss';

export class SideNav extends React.Component {
	static propTypes = {
		selectedServer: React.PropTypes.number.isRequired,
		selectedDb: React.PropTypes.string.isRequired,
		selectedCollection: React.PropTypes.string.isRequired,
		databases: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		collections: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		actions: React.PropTypes.object.isRequired,
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.selectedDb !== this.props.selectedDb) {
			this.props.actions.fetchCollections(nextProps.selectedDb);
		}
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onServerSelect = (e) => {
		e.preventDefault();
	};

	onDbSelect = (e) => {
		e.preventDefault();
		this.props.actions.selectDb(e.target.value);
	};

	onCollectionSelect = (collection) => (e) => {
		e.preventDefault();
		this.props.actions.selectAndSearchDocs(collection);
	};

	onAddCollectionClick = (e) => {
		e.preventDefault();
		this.props.actions.showModal('CollectionCreate', { db: this.props.selectedDb });
	};

	render() {
		return (
			<aside className={styles.sideNav}>
				<div className={styles.servers}>
					<h3 className={styles.h3}>Server:</h3>
					<select className={styles.select} value={this.props.selectedServer} onChange={this.onServerSelect}>
						<option value={-1}></option>
						{/*this.props.servers.map((server) => <option key={`server_${server.id}`} value={server.id}>{server.name}</option>)*/}
					</select>
				</div>

				<div className={styles.databases}>
					<h3 className={styles.h3}>Databases:</h3>
					<select className={styles.select} value={this.props.selectedDb} onChange={this.onDbSelect}>
						<option value=""></option>
						{this.props.databases.map((db, i) => <option key={`db_${i}`} value={db}>{db}</option>)}
					</select>
					{this.props.selectedDb ? <a href="#"><svg className="icon-settings"><use xlinkHref="#icon-settings"></use></svg></a> : null}
				</div>

				<div className={styles.collections}>
					<h3 className={styles.h3}>Collections</h3>
					<a onClick={this.onAddCollectionClick}><svg className="icon-add"><use xlinkHref="#icon-add"></use></svg></a>
					<nav className={styles.nav}>
						{this.props.collections.map((collection, i) => <a key={`col_${i}`} className={collection == this.props.selectedCollection ? styles.collectionActive : styles.collection} onClick={this.onCollectionSelect(collection)}><svg className="icon-apps"><use xlinkHref="#icon-apps"></use></svg>{collection}</a>)}
					</nav>
				</div>
			</aside>
		);
	}
}

const EMPTY_ARR = [];
function mapStateToProps(state) {
	console.log('state.servers', state.servers);
	return {
		selectedServer: state.selectedServer || -1,
		servers: state.servers || EMPTY_ARR,
		selectedDb: state.selectedDb || '',
		databases: state.databases || EMPTY_ARR,
		selectedCollection: state.selectedCollection || '',
		collections: state.collections || EMPTY_ARR,
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ selectDb, selectAndSearchDocs, fetchCollections, showModal }, dispatch),
	};
}

export default connect(mapStateToProps, mapActionsToProps)(SideNav);
