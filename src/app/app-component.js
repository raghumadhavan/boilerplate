import React from 'react';
import PropTypes from 'prop-types';
import AppRoutes from './app-routes-component';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className={'cfe-header'}>Frontend boilerplate</h1>
        <AppRoutes/>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
