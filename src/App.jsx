import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Routes from 'common/components/Routes/Routes';
import Layout from 'common/components/Layout/Layout';

import AppProvider from './AppProvider';
import routes from './routes';

import './App.scss';

const App = () => (
  <Router>
    <AppProvider>
      <Layout>
        <Switch>
          <Routes routes={routes} />
        </Switch>
      </Layout>
    </AppProvider>
  </Router>
);

export default App;
