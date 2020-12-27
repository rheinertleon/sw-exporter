import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Layout from './pages/Layout';
import Logs from './pages/Logs';
import Settings from './pages/Settings';
import Help from './pages/Help';

const { remote } = require('electron');
const plugins = remote.getGlobal('plugins');
const pluginRoutes = plugins
  .filter(plugin => plugin.routes && Array.isArray(plugin.routes))
  .map(plugin =>
    plugin.routes.map(route => <Route key={plugin.pluginName + route.name} exact path={'/plugin' + route.path} component={route.component} />)
  )
  .flat();

ReactDOM.render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Logs} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/help" component={Help} />
        {pluginRoutes}
        <Redirect to="/" />
      </Switch>
    </Layout>
  </BrowserRouter>,
  document.getElementById('app')
);
