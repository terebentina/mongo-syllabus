import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import request from '../../utils/request';

import * as Actions from '../';
import * as Constants from '../constants';


test('Actions:filter docs', (t) => {
	let res = Actions.setDocsFilter();
	t.deepEqual(res, { type: Constants.FILTER_DOCS, filter: { query: '', limit: 30 } }, 'proper default without a doc filter');
	const filter = { query: 'asd', limit: 10 };
	res = Actions.setDocsFilter({ query: 'asd', limit: 10 });
	t.deepEqual(res, { type: Constants.FILTER_DOCS, filter: filter }, 'proper return with a doc filter');
	t.end();
});


test('Actions:fetchDocs', (t) => {
	sinon.stub(request, 'get').returns(Promise.resolve({ results: ['a', 'b', 'c'], total: 123 }));
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	const expectedActions = [
		(actualAction) => t.deepEqual({ type: Constants.REQUEST_DOCS }, actualAction),
		(actualAction) => t.deepEqual({ type: Constants.RECEIVE_DOCS, collection: 'collection', page: 0, docs: { results: ['a', 'b', 'c'], total: 123 } }, actualAction),
	];

	const store = mockStore({ selectedDb: 'db', selectedCollection: 'collection', filter: { limit: 30, query: '' } }, expectedActions, t.end);
	store.dispatch(Actions.fetchDocs());
	request.get.restore();
});


test('Actions:searchDocs', (t) => {
	sinon.stub(request, 'get').returns(Promise.resolve({ results: ['a', 'b', 'c'], total: 123 }));
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	const filter = { query: 'asd', limit: 13 };

	const expectedActions = [
		(actualAction) => t.deepEqual({ type: Constants.FILTER_DOCS, filter: filter }, actualAction),
		(actualAction) => t.deepEqual({ type: Constants.REQUEST_DOCS }, actualAction),
		(actualAction) => t.deepEqual({ type: Constants.RECEIVE_DOCS, collection: 'collection', page: 0, docs: { results: ['a', 'b', 'c'], total: 123 } }, actualAction),
	];

	const store = mockStore({ selectedDb: 'db', selectedCollection: 'collection', filter: { limit: 30, query: '' } }, expectedActions, t.end);
	store.dispatch(Actions.searchDocs(filter));
	request.get.restore();
});
