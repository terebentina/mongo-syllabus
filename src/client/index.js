import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppConnector from './AppConnector';

const store = configureStore();

ReactDOM.render((
	<Provider store={store}>
		<AppConnector />
	</Provider>
), document.getElementById('root'));
