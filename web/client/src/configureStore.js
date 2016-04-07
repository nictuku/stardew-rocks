import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

export default function configureStore () {
  const store = createStore(rootReducer, applyMiddleware(
    thunk, promiseMiddleware
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    console.log('help')
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
