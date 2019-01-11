import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from 'lib/i18n';

class AppRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={() => <div className='cfe-content'>{i18n.translate('app.greetings')}</div>}/>
      </Switch>
    );
  }
}

AppRoutes.propTypes = {};

export default AppRoutes;
