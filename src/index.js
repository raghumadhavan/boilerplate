import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import i18n from 'lib/i18n';
import App from 'app/app-component';
import configureStore from './store';
import 'app/app.scss';

const store = configureStore();

i18n.init(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>,
    document.querySelector('.container')
  );
});
