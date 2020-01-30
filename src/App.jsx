import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import { AlertProvider } from 'context/alert';
import { AuthProvider } from 'context/use-auth';

import Home from 'pages/Home';
import SignIn from 'components/SignIn/SignIn';
import SignUp from 'components/SignUp/SignUp';
import Alerts from 'components/Alerts/Alerts';
import Navbar from 'components/Navbar/Navbar';

const App = () => (

  <Router>
    <AlertProvider>
      <AuthProvider>
        <Navbar />
        <section className="section">
          <Alerts />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
          </Switch>
        </section>
      </AuthProvider>
    </AlertProvider>
  </Router>
);

export default App;
