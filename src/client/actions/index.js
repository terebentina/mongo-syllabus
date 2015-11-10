import fetch from 'isomorphic-fetch';

export const REQUEST_DATABASES = 'REQUEST_DATABASES';
export const RECEIVE_DATABASES = 'RECEIVE_DATABASES';
export const REQUEST_COLLECTIONS = 'REQUEST_COLLECTIONS';
export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
export const REQUEST_DOCS = 'REQUEST_DOCS';
export const RECEIVE_DOCS = 'RECEIVE_DOCS';
export const SELECT_DB = 'SELECT_DB';
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
		return fetch(`/api/databases`)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			}).then((json) => dispatch(receiveDatabases(json)))
			.catch((err) => {
				dispatch(receiveDatabases([]));
				return dispatch(showMessage(err.message, MESSAGE_ERROR));
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

function requestDocs(collection) {
	return {type: REQUEST_DOCS, collection};
}

function receiveDocs(collection, json) {
	return {
		type: RECEIVE_DOCS,
		collection: collection,
		docs: json,
	};
}

export function fetchDocs(db, collection, query = {}, skip = 0, limit = 0) {
	return (dispatch) => {
		dispatch(requestDocs(collection));
		let qs = {

		};
		return fetch(`/api/docs/${db}/${collection}?query=${encodeURIComponent(JSON.stringify(query))}&skip=${parseInt(skip, 10)}&limit=${parseInt(limit, 10)}`)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			}).then(json => dispatch(receiveDocs(collection, json)))
			.catch((err) => {
				dispatch(receiveDocs(collection, []));
				return dispatch(showMessage(err.message, MESSAGE_ERROR));
			});
	};
}

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
		return fetch(`/api/collections/${db}`)
			.then((response) => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			}).then(json => dispatch(receiveCollections(db, json)))
			.catch((err) => {
				dispatch(receiveCollections(db, []));
				return dispatch(showMessage(err.message, MESSAGE_ERROR));
			});
	};
}

export function showMessage(message, type) {
	return {type: SHOW_MESSAGE, message: message, messageType: type};
}

export function hideMessage() {
	return {type: HIDE_MESSAGE};
}
