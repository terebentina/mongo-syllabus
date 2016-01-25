import request from '../utils/request';
import * as Constants from './constants';

function requestDatabases() {
	return { type: Constants.REQUEST_DATABASES };
}

function receiveDatabases(json) {
	return {
		type: Constants.RECEIVE_DATABASES,
		databases: json,
	};
}

function fetchDatabases() {
	return (dispatch) => {
		dispatch(requestDatabases());
		return request.get(`/api/databases`)
			.then((json) => dispatch(receiveDatabases(json)))
			.catch((err) => {
				dispatch(receiveDatabases([]));
				return dispatch(showMessage(err.statusText, Constants.MESSAGE_ERROR));
			});
	};
}

function shouldFetchDatabases(state) {
	if (state.databases.length) {
		return false;
	}
	return !state.isFetching;
}

function requestCollections(db) {
	return { type: Constants.REQUEST_COLLECTIONS, db };
}

function receiveCollections(db, json) {
	return {
		type: Constants.RECEIVE_COLLECTIONS,
		db: db,
		collections: json,
	};
}

function requestDocs() {
	return { type: Constants.REQUEST_DOCS };
}

function receiveDocs(collection, page, docs) {
	return {
		type: Constants.RECEIVE_DOCS,
		collection,
		page,
		docs,
	};
}

export function setDocsFilter(obj = { query: '', limit: 30 }) {
	return {
		type: Constants.FILTER_DOCS,
		filter: obj,
	};
}

export function selectAndSearchDocs(collection) {
	return (dispatch) => {
		dispatch(selectCollection(collection));
		dispatch(setDocsFilter());
		dispatch(fetchDocs());
	};
}

export function searchDocs() {
	return (dispatch) => {
		dispatch(setDocsFilter());
		dispatch(fetchDocs());
	};
}

export function fetchDocs(pageNum = 0) {
	return (dispatch, getState) => {
		const state = getState();
		if (pageNum != state.currentPage) {
			dispatch(requestDocs());
			return request.get(`${Constants.API_URL}/api/docs/${state.selectedDb}/${state.selectedCollection}`, { query: state.filter.query, p: pageNum, limit: state.filter.limit })
				.then(json => dispatch(receiveDocs(state.selectedCollection, pageNum, json)))
				.catch((err) => {
					dispatch(receiveDocs(state.selectedCollection, []));
					return dispatch(showMessage(err.statusText, Constants.MESSAGE_ERROR));
				});
		}
	};
}

//export function setCurrentPage(pageNum) {
//	return {
//		type: SET_CURRENT_PAGE,
//		page: pageNum,
//	};
//}

export function selectDb(db) {
	return { type: Constants.SELECT_DB, db };
}

export function fetchDatabasesIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchDatabases(getState())) {
			return dispatch(fetchDatabases());
		}
	};
}

export function selectCollection(collection) {
	return { type: Constants.SELECT_COLLECTION, collection };
}

export function fetchCollections(db) {
	return (dispatch) => {
		dispatch(requestCollections(db));
		return request.get(`${Constants.API_URL}/api/collections/${db}`)
			.then(json => dispatch(receiveCollections(db, json)))
			.catch((err) => {
				dispatch(receiveCollections(db, []));
				return dispatch(showMessage(err.statusText, Constants.MESSAGE_ERROR));
			});
	};
}

export function showMessage(message, type) {
	return { type: Constants.SHOW_MESSAGE, message: message, messageType: type };
}

export function hideMessage() {
	return { type: Constants.HIDE_MESSAGE };
}


/**
 * this dispatches the confirmation which is handled by a component. If the user confirms, the component will call the function provided by this action which, in turn, dispatches remove
 * @param docId
 * @returns {Function}
 */
export function confirmAndRemoveDoc(docId) {
	return (dispatch) => {
		dispatch(confirm('Are you sure you want to delete this document?', removeDoc.bind(this, docId)));
	};
}


function confirm(message, fn) {
	return {
		type: Constants.CONFIRMATION,
		message,
		fn,
	};
}

export function renameCollection(newName) {
	return (dispatch, getState) => {
		const state = getState();
		return request.put(`${Constants.API_URL}/api/collections/${state.selectedDb}/${state.selectedCollection}`, { collection: newName })
			.then(() => dispatch({ type: Constants.RENAME_COLLECTION, oldName: state.selectedCollection, newName }))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(err.statusText, Constants.MESSAGE_ERROR));
			});
	};
}

export function removeDoc(docId) {
	return (dispatch, getState) => {
		const state = getState();
		return request.delete(`${Constants.API_URL}/api/docs/${state.selectedDb}/${state.selectedCollection}/${docId}`)
			.then(() => dispatch({ type: Constants.REMOVE_DOC, docId }))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(err.statusText, Constants.MESSAGE_ERROR));
			});
	};
}

export function showModal(modal, payload) {
	return {
		type: Constants.SHOW_MODAL,
		modal,
		payload,
	};
}

export function hideModal() {
	document.documentElement.classList.remove('modal_open');
	return {
		type: Constants.HIDE_MODAL,
	};
}
