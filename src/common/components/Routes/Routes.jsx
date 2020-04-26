import React, { useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import useAuth from 'common/contexts/auth';
import Page404 from 'common/pages/404';

const getUserRoutes = (routes, user) => routes.map((route, key) => {
  let { component } = route;
  const {
    path, roles = null, exact = true,
  } = route;

  if (roles) {
    if (user) {
      if (!roles.includes(user.role.name)) {
        component = Page404;
      }
    } else {
      component = () => (<Redirect to="/login" />);
    }
  }

  return <Route key={key} path={path} exact={exact} component={component} />;
});

const Routes = ({ routes }) => {
  const { user } = useAuth();
  const userRoutes = useMemo(() => getUserRoutes(routes, user), [routes, user]);

  return userRoutes;
};

Routes.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default Routes;
