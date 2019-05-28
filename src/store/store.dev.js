/** @format */

import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from 'SRC/reducers';
import apiMiddleware from 'SRC/middleware/api';

export default function initStore(initialState) {
  const history = createHistory();
  const rootReducer = createRootReducer();
  const middlewares = [thunk, apiMiddleware];

  // compose store enhancers
  const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });

  const store = composeEnhancers(applyMiddleware(...middlewares))(createStore)(
    rootReducer,
    initialState,
  );

  // eslint-disable-next-line no-console
  // const stateLogger = () => console.info(store.getState());
  // store.subscribe(stateLogger);
  // stateLogger();

  return { store, history };
}
