import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);
