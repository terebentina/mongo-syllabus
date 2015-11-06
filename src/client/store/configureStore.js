import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

/**
 * store should be like this: {databases: [], collections: [], isFetching: false, selectedDb: '', selectedCollection: ''}
 */

const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	createLogger()
)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
