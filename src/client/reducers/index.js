import { combineReducers } from 'redux';
import _ from 'lodash';
import * as Constants from '../actions/constants';

/**
 * state = {
 *      databases: [],
 *      selectedDb: '',
 *      collections: [],
 *      selectedCollection: '',
 *      filter: {query: '', limit: 30}
 *      docs: [],
 *      totalDocs: 0,
 *      currentPage: 0,
 *      isFetching: true|false,
 *      message: {message: '', type: ''},
 *      confirmation: {message: '', fn: <func>},
 *      modalToShow: {name: '', payload: {}},
 * }
 */

function selectedDb(state = '', action) {
	switch (action.type) {
		case Constants.SELECT_DB:
			return action.db;
		default:
			return state;
	}
}

function selectedCollection(state = '', action) {
	switch (action.type) {
		case Constants.SELECT_COLLECTION:
			return action.collection;
		case Constants.SELECT_DB:
			return '';
		default:
			return state;
	}
}

function databases(state = [], action) {
	switch (action.type) {
		case Constants.RECEIVE_DATABASES:
			return action.databases.slice();
		default:
			return state;
	}
}

function collections(state = [], action) {
	switch (action.type) {
		case Constants.RECEIVE_COLLECTIONS:
			return action.collections.slice();
		case Constants.SELECT_DB:
			return [];
		default:
			return state;
	}
}

const DEFAULT_FILTER = { query: '', limit: 30 };
function filter(state = DEFAULT_FILTER, action) {
	switch (action.type) {
		case Constants.FILTER_DOCS:
			return Object.assign({}, state, action.filter);
		case Constants.SELECT_DB:
		case Constants.SELECT_COLLECTION:
			return Object.assign({}, DEFAULT_FILTER);
		default:
			return state;
	}
}

function docs(state = [], action) {
	switch (action.type) {
		case Constants.RECEIVE_DOCS:
			return action.docs.results.slice();
		case Constants.SELECT_DB:
		case Constants.SELECT_COLLECTION:
			return [];
		case Constants.REMOVE_DOC:
			const idx = _.findIndex(state, { _id: action.docId });
			if (idx > -1) {
				return [...state.slice(0, idx), ...state.slice(idx + 1)];
			}
			return state;
		default:
			return state;
	}
}

function totalDocs(state = 0, action) {
	switch (action.type) {
		case Constants.RECEIVE_DOCS:
			return action.docs.total;
		case Constants.SELECT_DB:
		case Constants.SELECT_COLLECTION:
			return 0;
		default:
			return state;
	}
}

function currentPage(state = null, action) {
	switch (action.type) {
		//case Constants.SET_CURRENT_PAGE:
		case Constants.RECEIVE_DOCS:
			return action.page;
		case Constants.SELECT_DB:
		case Constants.FILTER_DOCS:
		case Constants.SELECT_COLLECTION:
			return null;
		default:
			return state;
	}
}

function isFetching(state = false, action) {
	switch (action.type) {
		case Constants.REQUEST_DATABASES:
		case Constants.REQUEST_COLLECTIONS:
		case Constants.REQUEST_DOCS:
			return true;
		case Constants.RECEIVE_DATABASES:
		case Constants.RECEIVE_COLLECTIONS:
		case Constants.RECEIVE_DOCS:
			return false;
		default:
			return state;
	}
}

function message(state = null, action) {
	if (action.type === Constants.SHOW_MESSAGE) {
		return {
			message: action.message,
			type: action.messageType,
		};
	} else if (action.type === Constants.HIDE_MESSAGE) {
		return null;
	}

	return state;
}

function confirmation(state = null, action) {
	if (action.type === Constants.CONFIRMATION) {
		return {
			message: action.message,
			fn: action.fn,
		};
	}

	return state;
}

function modalToShow(state = null, action) {
	if (action.type === Constants.SHOW_MODAL) {
		return {
			modal: action.modal,
			payload: action.payload,
		};
	}

	return state;
}

const rootReducer = combineReducers({
	databases,
	selectedDb,
	collections,
	selectedCollection,
	filter,
	docs,
	totalDocs,
	currentPage,
	isFetching,
	message,
	confirmation,
	modalToShow,
});

export default rootReducer;
