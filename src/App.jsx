import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import { AlertProvider } from './common/context/alert';
import { AuthProvider } from './auth/context/use-auth';

import Home from './pages/Home';
import SignIn from './auth/components/SignIn/SignIn';
import SignUp from './auth/components/SignUp/SignUp';
import Alert from './common/components/Alert/Alert';
import Navbar from './common/components/Navbar/Navbar';

const App = () => (

  <Router>
    <AuthProvider>
      <AlertProvider>
        <Navbar />
        <section className="section">
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
          </Switch>
        </section>
      </AlertProvider>
    </AuthProvider>
  </Router>
);

export default App;
