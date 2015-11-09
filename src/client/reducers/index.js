import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

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

function docs(state = [], action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_DOCS:
			return Object.assign([], state, action.docs);
		case ActionTypes.SELECT_DB:
		case ActionTypes.SELECT_COLLECTION:
			return [];
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
	collections,
	docs,
	selectedDb,
	selectedCollection,
	isFetching,
	message,
});

export default rootReducer;
