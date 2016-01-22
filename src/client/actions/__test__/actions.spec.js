import test from 'tape';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

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


/*
test('Actions:fetchDocs', (t) => {
	const middlewares = [thunk];
	const mockStore = configureMockStore(middlewares);
	nock(/localhost/).get('/api/docs/db/collection').reply(200, { body: { data: ['a', 'b', 'c'] } });
	const expectedActions = [
		{ type: Constants.REQUEST_DOCS },
		{ type: Constants.RECEIVE_DOCS, collection: 'collection', page: 0, docs: ['a', 'b', 'c'] },
	];
	const done = () => {t.end();};
	const store = mockStore({ todos: [] }, expectedActions, done);
	store.dispatch(Actions.fetchDocs(0));
});
*/
