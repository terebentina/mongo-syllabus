import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { filterShape } from 'client/store/shapes';
import QueryBoxConnector from './collection/QueryBoxConnector';
import Results from './collection/Results';
import Popover from '@terebentina/react-popover';

import styles from './Collection.css';

class Collection extends Component {
	static propTypes = {
		viewMode: PropTypes.string.isRequired,
		selectedDb: PropTypes.string.isRequired,
		selectedCollection: PropTypes.string.isRequired,
		filter: filterShape.isRequired,
		docs: PropTypes.arrayOf(PropTypes.object).isRequired,
		totalDocs: PropTypes.number.isRequired,
		currentPage: PropTypes.number.isRequired,
		actions: PropTypes.object.isRequired,
	};

	shouldComponentUpdate = shouldPureComponentUpdate;

	onNewQuery = (filter) => {
		this.props.actions.searchDocs(filter);
	};

	onPageLoad = (pageNum) => {
		this.props.actions.fetchDocs(pageNum);
	};

	onRenameClick = (e) => {
		const { actions, selectedDb, selectedCollection } = this.props;

		e.preventDefault();
		actions.showModal('CollectionRename', { db: selectedDb, collection: selectedCollection });
	};

	onDropClick = (e) => {
		const { actions, selectedDb, selectedCollection } = this.props;

		e.preventDefault();
		actions.confirmAndDropCollection(selectedDb, selectedCollection);
	};

	onInfoClick = (e) => {
		e.preventDefault();
	};

	setViewMode = (mode) => (e) => {
		e.preventDefault();
		this.props.actions.setViewMode(mode);
	};

	render() {
		const { selectedDb, selectedCollection, viewMode, docs, totalDocs, currentPage, filter } = this.props;

		if (!selectedDb || !selectedCollection) {
			return null;
		}
		return (
			<div className={styles.collection}>
				<header className={styles.header}>
					<h2 className={styles.h2}>{`Collection: ${selectedCollection}`}</h2>
					<a className={styles.iconLink} onClick={this.onInfoClick}><svg><use xlinkHref="#icon-info"></use></svg></a>
					<a className={styles.iconLink} onClick={this.onRenameClick}><svg><use xlinkHref="#icon-create"></use></svg></a>
					<a className={styles.iconLink} onClick={this.onDropClick}><svg><use xlinkHref="#icon-delete"></use></svg></a>
					<a className={styles.iconLink} href="#"><svg><use xlinkHref="#icon-add"></use></svg></a>
					<Popover className="menu" position="bottom" trigger={<svg><use xlinkHref="#icon-visibility"></use></svg>}>
						<a href="" onClick={this.setViewMode('json')}>as Json</a>
						<a href="" onClick={this.setViewMode('table')}>as table</a>
					</Popover>
				</header>
				<QueryBoxConnector onSubmit={this.onNewQuery} />
				<Results viewMode={viewMode} selectedDb={selectedDb} selectedCollection={selectedCollection} results={docs} total={totalDocs} currentPage={currentPage} rpp={filter.limit} onPageLoadRequest={this.onPageLoad} />
			</div>
		);
	}
}

export default Collection;
