import request from 'client/utils/request';
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
		return request.get(`${Constants.API_URL}/api/databases`)
			.then((json) => dispatch(receiveDatabases(json)))
			.catch((err) => Promise.all([
				dispatch(receiveDatabases([])),
				dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR)),
			]));
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
		db,
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
	return (dispatch) => Promise.all([
		dispatch(selectCollection(collection)),
		dispatch(setDocsFilter()),
		dispatch(fetchDocs()),
	]);
}

export function searchDocs(obj = { query: '', limit: 30 }) {
	return (dispatch) => Promise.all([
		dispatch(setDocsFilter(obj)),
		dispatch(fetchDocs()),
	]);
}

export function fetchDocs(pageNum = 0) {
	return (dispatch, getState) => {
		const state = getState();
		if (pageNum != state.currentPage) {
			return Promise.all([
				dispatch(requestDocs()),
				request.get(`${Constants.API_URL}/api/docs/${state.selectedDb}/${state.selectedCollection}`, { query: state.filter.query, p: pageNum, limit: state.filter.limit })
					.then(json => dispatch(receiveDocs(state.selectedCollection, pageNum, json)))
					.catch((err) => Promise.all([
						dispatch(receiveDocs(state.selectedCollection, pageNum, [])),
						dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR)),
					])),
			]);
		}
	};
}

function removeDoc(db, collection, docId) {
	return (dispatch) =>
		request.delete(`${Constants.API_URL}/api/docs/${db}/${collection}/${docId}`)
			.then(() => dispatch({ type: Constants.REMOVE_DOC, docId }))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR));
			});
}


/**
 * this dispatches the confirmation which is handled by a component. If the user confirms, the component will call the function provided by this action which, in turn, dispatches remove
 * @param db
 * @param collection
 * @param docId
 * @returns {Function}
 */
export function confirmAndRemoveDoc(db, collection, docId) {
	return (dispatch) => {
		dispatch(confirm('Are you sure you want to delete this document?', removeDoc.bind(this, db, collection, docId)));
	};
}


export function updateDocument(oldData, doc) {
	return (dispatch) =>
		request.put(`${Constants.API_URL}/api/docs/${oldData.db}/${oldData.collection}/${oldData.doc._id}`, { doc })
			.then(() => dispatch({ type: Constants.UPDATE_DOC, docId: oldData._id, doc }))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR));
			});
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
	return (dispatch) => Promise.all([
		dispatch(requestCollections(db)),
		request.get(`${Constants.API_URL}/api/collections/${db}`)
			.then(json => dispatch(receiveCollections(db, json)))
			.catch((err) => Promise.all([
				dispatch(receiveCollections(db, [])),
				dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR)),
			])),
	]);
}

export function showMessage(message, type = Constants.MESSAGE_SUCCESS) {
	return { type: Constants.SHOW_MESSAGE, message, messageType: type };
}

export function hideMessage() {
	return { type: Constants.HIDE_MESSAGE };
}


function confirm(message, fn) {
	return {
		type: Constants.CONFIRMATION,
		message,
		fn,
	};
}

export function createCollection(db, collectionName) {
	return (dispatch) =>
		request.post(`${Constants.API_URL}/api/collections/${db}/${collectionName}`)
			.then(() => Promise.all([
				dispatch({ type: Constants.CREATE_COLLECTION, collectionName }),
				dispatch(showMessage('Collection created')),
			]))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR));
			});
}

export function renameCollection(oldData, newName) {
	return (dispatch) =>
		request.put(`${Constants.API_URL}/api/collections/${oldData.db}/${oldData.collection}`, { collection: newName })
			.then(() => Promise.all([
				dispatch({ type: Constants.RENAME_COLLECTION, oldName: oldData.collection, newName }),
				dispatch(showMessage('Collection renamed')),
			]))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR));
			});
}


/**
 * this dispatches the confirmation which is handled by a component. If the user confirms, the component will call the function provided by this action which, in turn, dispatches remove
 * @param db
 * @param collection
 * @returns {Function}
 */
export function confirmAndDropCollection(db, collection) {
	return (dispatch) => {
		dispatch(confirm(`Are you sure you want to drop ${collection}?`, dropCollection.bind(this, db, collection)));
	};
}

function dropCollection(db, collection) {
	return (dispatch) =>
		request.delete(`${Constants.API_URL}/api/collections/${db}/${collection}`)
			.then(() => Promise.all([
				dispatch({ type: Constants.DROP_COLLECTION, collection }),
				dispatch(showMessage('Collection dropped')),
			]))
			.catch((err) => {
				console.log('err', err.stack);
				return dispatch(showMessage(`Server responded: ${err.statusText}`, Constants.MESSAGE_ERROR));
			});
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

export function setViewMode(mode) {
	return {
		type: Constants.SET_VIEW_MODE,
		mode,
	};
}
