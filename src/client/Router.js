import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import App from './App';

export default () => {
	return (
		<Router history={createBrowserHistory()}>
			<Route path="/" component={App} />
		</Router>
	);
};
