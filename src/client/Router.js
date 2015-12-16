import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './App.jsx';
import Collection from './Collection.jsx';

export default () => {
	return (
		<Router history={createBrowserHistory()}>
			<Route path="/" component={App} />
			<Route path="/:db/:collection" component={Collection} />
		</Router>
	);
};
