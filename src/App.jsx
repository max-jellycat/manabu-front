import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import { AlertProvider } from './common/context/alert';
import { AuthProvider } from './auth/context/use-auth';

import Home from './pages/Home';
import SignIn from './auth/components/SignIn/SignIn';
import SignUp from './auth/components/SignUp/SignUp';
import Alert from './common/components/Alert/Alert';

const App = () => (
  <section className="section">
    <Router>
      <AuthProvider>
        <AlertProvider>
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
          </Switch>
        </AlertProvider>
      </AuthProvider>
,
    </Router>
  </section>
);

export default App;
