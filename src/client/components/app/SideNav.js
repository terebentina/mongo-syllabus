import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import styles from './SideNav.css';

class SideNav extends Component {
	static propTypes = {
		selectedServer: PropTypes.number.isRequired,
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		databases: PropTypes.arrayOf(PropTypes.string).isRequired,
		collections: PropTypes.arrayOf(PropTypes.string).isRequired,
		actions: PropTypes.object.isRequired,
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
		const { selectedServer, databases, selectedDb, collections, selectedCollection } = this.props;

		return (
			<aside className={styles.sideNav}>
				<div className={styles.servers}>
					<h3 className={styles.h3}>Server:</h3>
					<select className={styles.select} value={selectedServer} onChange={this.onServerSelect}>
						<option value={-1}></option>
						{/*this.props.servers.map((server) => <option key={`server_${server.id}`} value={server.id}>{server.name}</option>)*/}
					</select>
				</div>

				<div className={styles.databases}>
					<h3 className={styles.h3}>Databases:</h3>
					<select className={styles.select} value={selectedDb} onChange={this.onDbSelect}>
						<option value=""></option>
						{databases.map((db, i) => <option key={`db_${i}`} value={db}>{db}</option>)}
					</select>
					{selectedDb ? <a href="#"><svg><use xlinkHref="#icon-settings"></use></svg></a> : null}
				</div>

				<div className={styles.collections}>
					<h3 className={styles.h3}>Collections</h3>
					<a onClick={this.onAddCollectionClick}><svg><use xlinkHref="#icon-add"></use></svg></a>
					<nav className={styles.nav}>
						{collections.map((collection, i) => <a key={`col_${i}`} className={collection == selectedCollection ? styles.collectionActive : styles.collection} onClick={this.onCollectionSelect(collection)}><svg><use xlinkHref="#icon-apps"></use></svg>{collection}</a>)}
					</nav>
				</div>
			</aside>
		);
	}
}

export default SideNav;
