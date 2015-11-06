import { combineReducers } from 'redux';
import {SELECT_DB, SELECT_COLLECTION, REQUEST_DATABASES, RECEIVE_DATABASES, REQUEST_COLLECTIONS, RECEIVE_COLLECTIONS} from '../actions';

function selectedDb(state = '', action) {
	switch (action.type) {
		case SELECT_DB:
			return action.db;
		default:
			return state;
	}
}

function selectedCollection(state = '', action) {
	switch (action.type) {
		case SELECT_COLLECTION:
			return action.collection;
		default:
			return state;
	}
}

function databases(state = [], action) {
	switch (action.type) {
		case RECEIVE_DATABASES:
			return Object.assign([], state, action.databases);
		default:
			return state;
	}
}

function collections(state = [], action) {
	switch (action.type) {
		case RECEIVE_COLLECTIONS:
			return Object.assign([], state, action.collections);
		default:
			return state;
	}
}

function isFetching(state = false, action) {
	switch (action.type) {
		case REQUEST_DATABASES:
		case REQUEST_COLLECTIONS:
			return true;
		case RECEIVE_DATABASES:
		case RECEIVE_COLLECTIONS:
			return false;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	databases,
	collections,
	selectedDb,
	selectedCollection,
	isFetching,
});

export default rootReducer;
