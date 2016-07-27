import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchDocs, fetchDocs, showModal, confirmAndDropCollection, setViewMode } from 'client/actions';
import Collection from './Collection';

function CollectionConnector(props) {
	return <Collection {...props} />;
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

export default connect(mapStateToProps, mapActionsToProps)(CollectionConnector);
