import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import request from 'client/utils/request';

import * as Actions from '../';
import * as Constants from '../constants';


test('Actions:filter docs', (t) => {
	let res = Actions.setDocsFilter();
	t.deepEqual(res, { type: Constants.FILTER_DOCS, filter: { query: '', limit: 30 } }, 'proper default without a doc filter');
	const filter = { query: 'asd', limit: 10 };
	res = Actions.setDocsFilter({ query: 'asd', limit: 10 });
	t.deepEqual(res, { type: Constants.FILTER_DOCS, filter }, 'proper return with a doc filter');
	t.end();
});


test('Actions:fetchDocs', (t) => {
	const sandbox = sinon.sandbox.create();
	const stub = sandbox.stub(request, 'get').returns(Promise.resolve({ results: ['a', 'b', 'c'], total: 123 }));
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	const expectedActions = [
		{ type: Constants.REQUEST_DOCS },
		{ type: Constants.RECEIVE_DOCS, collection: 'collection', page: 0, docs: { results: ['a', 'b', 'c'], total: 123 } },
	];

	const store = mockStore({ selectedDb: 'db', selectedCollection: 'collection', filter: { limit: 30, query: '' } });
	store.dispatch(Actions.fetchDocs()).then(() => {
		const actions = store.getActions();
		t.deepEqual(actions, expectedActions, 'request docs and receive docs should be dispatched');
		stub.restore();
		sandbox.restore();
		t.end();
	});
});


test('Actions:searchDocs', (t) => {
	const sandbox = sinon.sandbox.create();
	const stub = sandbox.stub(request, 'get').returns(Promise.resolve({ results: ['a', 'b', 'c'], total: 123 }));
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	const filter = { query: 'asd', limit: 13 };

	const expectedActions = [
		{ type: Constants.FILTER_DOCS, filter },
		{ type: Constants.REQUEST_DOCS },
		{ type: Constants.RECEIVE_DOCS, collection: 'collection', page: 0, docs: { results: ['a', 'b', 'c'], total: 123 } },
	];

	const store = mockStore({ selectedDb: 'db', selectedCollection: 'collection', filter: { limit: 30, query: '' } });
	store.dispatch(Actions.searchDocs(filter)).then(() => {
		const actions = store.getActions();
		t.deepEqual(actions, expectedActions, 'FILTER_DOCS, REQUEST_DOCS and RECEIVE_DOCS actions should be dispatched');
		stub.restore();
		sandbox.restore();
		t.end();
	});
});
