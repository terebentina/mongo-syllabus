import request from '../utils/request';

export const REQUEST_DATABASES = 'REQUEST_DATABASES';
export const RECEIVE_DATABASES = 'RECEIVE_DATABASES';
export const REQUEST_COLLECTIONS = 'REQUEST_COLLECTIONS';
export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const REQUEST_DOCS = 'REQUEST_DOCS';
export const RECEIVE_DOCS = 'RECEIVE_DOCS';
export const FILTER_DOCS = 'FILTER_DOCS';
export const SELECT_DB = 'SELECT_DB';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SELECT_COLLECTION = 'SELECT_COLLECTION';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export const MESSAGE_ERROR = 'error';

function requestDatabases() {
	return {type: REQUEST_DATABASES};
}

function receiveDatabases(json) {
	return {
		type: RECEIVE_DATABASES,
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
				return dispatch(showMessage(err.statusText, MESSAGE_ERROR));
			});
	};
}

function shouldFetchDatabases(state) {
	if (state.databases.length) {
		return false;
	}
	if (state.isFetching) {
		return false;
	}
	return true;
}

function requestCollections(db) {
	return {type: REQUEST_COLLECTIONS, db};
}

function receiveCollections(db, json) {
	return {
		type: RECEIVE_COLLECTIONS,
		db: db,
		collections: json,
	};
}

function requestDocs() {
	return {type: REQUEST_DOCS};
}

function receiveDocs(collection, page, docs) {
	return {
		type: RECEIVE_DOCS,
		collection,
		page,
		docs,
	};
}

export function setDocsFilter(obj = {query: '', limit: 30}) {
	return {
		type: FILTER_DOCS,
		filter: obj,
	};
}

export function fetchDocs(pageNum = 0) {
	return (dispatch, getState) => {
		const state = getState();
		if (pageNum != state.currentPage) {
			dispatch(requestDocs());
			return request.get(`/api/docs/${state.selectedDb}/${state.selectedCollection}`, {query: state.filter.query, p: state.currentPage, limit: state.filter.limit})
				.then(json => dispatch(receiveDocs(state.selectedCollection, pageNum, json)))
				.catch((err) => {
					dispatch(receiveDocs(state.selectedCollection, []));
					return dispatch(showMessage(err.statusText, MESSAGE_ERROR));
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
	return {type: SELECT_DB, db};
}

export function fetchDatabasesIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchDatabases(getState())) {
			return dispatch(fetchDatabases());
		}
	};
}

export function selectCollection(collection) {
	return {type: SELECT_COLLECTION, collection};
}

export function fetchCollections(db) {
	return (dispatch) => {
		dispatch(requestCollections(db));
		return request.get(`/api/collections/${db}`)
			.then(json => dispatch(receiveCollections(db, json)))
			.catch((err) => {
				dispatch(receiveCollections(db, []));
				return dispatch(showMessage(err.statusText, MESSAGE_ERROR));
			});
	};
}

export function showMessage(message, type) {
	return {type: SHOW_MESSAGE, message: message, messageType: type};
}

export function hideMessage() {
	return {type: HIDE_MESSAGE};
}
