import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

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
 *      message: ''
 * }
 */

function selectedDb(state = '', action) {
	switch (action.type) {
		case ActionTypes.SELECT_DB:
			return action.db;
		default:
			return state;
	}
}

function selectedCollection(state = '', action) {
	switch (action.type) {
		case ActionTypes.SELECT_COLLECTION:
			return action.collection;
		case ActionTypes.SELECT_DB:
			return '';
		default:
			return state;
	}
}

function databases(state = [], action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_DATABASES:
			return action.databases.slice();
		default:
			return state;
	}
}

function collections(state = [], action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_COLLECTIONS:
			return action.collections.slice();
		case ActionTypes.SELECT_DB:
			return [];
		default:
			return state;
	}
}

const DEFAULT_FILTER = {query: '', limit: 30};
function filter(state = DEFAULT_FILTER, action) {
	switch (action.type) {
		case ActionTypes.FILTER_DOCS:
			return Object.assign({}, state, action.filter);
		case ActionTypes.SELECT_DB:
		case ActionTypes.SELECT_COLLECTION:
			return Object.assign({}, DEFAULT_FILTER);
		default:
			return state;
	}
}

function docs(state = [], action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_DOCS:
			return action.docs.results.slice();
		case ActionTypes.SELECT_DB:
			return [];
		default:
			return state;
	}
}

function totalDocs(state = 0, action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_DOCS:
			return action.docs.total;
		case ActionTypes.SELECT_DB:
			return 0;
		default:
			return state;
	}
}

function currentPage(state = null, action) {
	switch (action.type) {
		//case ActionTypes.SET_CURRENT_PAGE:
		case ActionTypes.RECEIVE_DOCS:
			return action.page;
		case ActionTypes.SELECT_DB:
			return null;
		default:
			return state;
	}
}

function isFetching(state = false, action) {
	switch (action.type) {
		case ActionTypes.REQUEST_DATABASES:
		case ActionTypes.REQUEST_COLLECTIONS:
		case ActionTypes.REQUEST_DOCS:
			return true;
		case ActionTypes.RECEIVE_DATABASES:
		case ActionTypes.RECEIVE_COLLECTIONS:
		case ActionTypes.RECEIVE_DOCS:
			return false;
		default:
			return state;
	}
}

function message(state = null, action) {
	if (action.type === ActionTypes.SHOW_MESSAGE) {
		return {
			message: action.message,
			type: action.messageType,
		};
	} else if (action.type === ActionTypes.HIDE_MESSAGE) {
		return null;
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
});

export default rootReducer;
