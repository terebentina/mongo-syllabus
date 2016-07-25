import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { searchDocs, fetchDocs, showModal, confirmAndDropCollection, setViewMode } from '../../actions';
import { filterShape } from '../../store/shapes';
import QueryBox from './collection/QueryBox.jsx';
import Results from './collection/Results.jsx';
import Popover from '@terebentina/react-popover';

import styles from './Collection.scss';

export class Collection extends Component {
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
		e.preventDefault();
		this.props.actions.showModal('CollectionRename', { db: this.props.selectedDb, collection: this.props.selectedCollection });
	};

	onDropClick = (e) => {
		e.preventDefault();
		this.props.actions.confirmAndDropCollection(this.props.selectedDb, this.props.selectedCollection);
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
				<QueryBox onSubmit={this.onNewQuery} />
				<Results viewMode={viewMode} selectedDb={selectedDb} selectedCollection={selectedCollection} results={docs} total={totalDocs} currentPage={currentPage} rpp={filter.limit} onPageLoadRequest={this.onPageLoad} />
			</div>
		);
	}
}

const defaultFilter = { query: '', limit: 30 };
const emptyArr = [];
function mapStateToProps(state) {
	return {
		selectedDb: state.selectedDb || '',
		selectedCollection: state.selectedCollection || '',
		filter: state.filter || defaultFilter,
		docs: state.docs || emptyArr,
		totalDocs: state.totalDocs || 0,
		currentPage: state.currentPage || 0,
		viewMode: state.viewMode || 'json',
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators({ searchDocs, fetchDocs, showModal, confirmAndDropCollection, setViewMode }, dispatch),
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Collection);
