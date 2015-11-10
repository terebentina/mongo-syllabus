import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from './Router';
import configureStore from './store/configureStore';

const store = configureStore();

import 'normalize.css';

ReactDOM.render((
	<Provider store={store}>
		<Router />
	</Provider>
), document.getElementById('root'));
