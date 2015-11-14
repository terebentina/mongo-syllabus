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
			return Object.assign([], state, action.databases);
		default:
			return state;
	}
}

function collections(state = [], action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_COLLECTIONS:
			return Object.assign([], state, action.collections);
		case ActionTypes.SELECT_DB:
			return [];
		default:
			return state;
	}
}

function filter(state = {query: '', limit: 30}, action) {
	switch (action.type) {
		case ActionTypes.FILTER_DOCS:
			return Object.assign({}, state, action.filter);
		default:
			return state;
	}
}

function docs(state = [], action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_DOCS:
			return Object.assign([], action.docs.results);
		case ActionTypes.SELECT_DB:
		case ActionTypes.SELECT_COLLECTION:
			return [];
		default:
			return state;
	}
}

function totalDocs(state = 0, action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_DOCS:
			return action.docs.total;
		default:
			return state;
	}
}

function currentPage(state = 0, action) {
	switch (action.type) {
		case ActionTypes.SET_CURRENT_PAGE:
			return action.page;
		default:
			return state;
	}
}

function isFetching(state = false, action) {
	switch (action.type) {
		case ActionTypes.REQUEST_DATABASES:
		case ActionTypes.REQUEST_COLLECTIONS:
			return true;
		case ActionTypes.RECEIVE_DATABASES:
		case ActionTypes.RECEIVE_COLLECTIONS:
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
