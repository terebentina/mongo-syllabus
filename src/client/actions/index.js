import fetch from 'isomorphic-fetch';

export const REQUEST_DATABASES = 'REQUEST_DATABASES';
export const RECEIVE_DATABASES = 'RECEIVE_DATABASES';
export const REQUEST_COLLECTIONS = 'REQUEST_COLLECTIONS';
export const RECEIVE_COLLECTIONS = 'RECEIVE_COLLECTIONS';
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
			.then((response) => response.json())
			.then((json) => dispatch(receiveDatabases(json)))
			.catch((err) => dispatch(showMessage(err.message, MESSAGE_ERROR)));
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
			.then(response => response.json())
			.then(json => dispatch(receiveCollections(db, json)));
	};
}

export function showMessage(message, type) {
	return {type: SHOW_MESSAGE, message: message, messageType: type};
}

export function hideMessage() {
	return {type: HIDE_MESSAGE};
}
