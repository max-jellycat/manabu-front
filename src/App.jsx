import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import Home from './pages/Home';
import SignIn from './auth/components/SignIn/SignIn';
import SignUp from './auth/components/SignUp/SignUp';
import Alert from './common/components/Alert/Alert';

const App = () => (
  <section className="section">
    <Alert />
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
      </Switch>
    </Router>
  </section>
);

export default App;
