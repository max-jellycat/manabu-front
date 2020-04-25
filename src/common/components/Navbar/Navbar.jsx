/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

import useAuth from 'common/contexts/auth';

const Navbar = () => {
  const { user, signout } = useAuth();
  return (
    <nav
      className="navbar is-dark is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          React Skeleton
        </Link>

        <a role="button" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {user ? (
            <>
              <div className="navbar-item">
                <span>Hello</span>
                <span className="ml has-text-weight-bold">{user.displayName}</span>
              </div>
              <div className="navbar-item">
                <a href="#" className="button is-danger is-outlined" onClick={() => signout()}>
                  <span className="icon">
                    <i className="fas fa-sign-out-alt" />
                  </span>
                  <span>Logout</span>
                </a>
              </div>
            </>
          ) : (
            <div className="navbar-item">
              <Link to="/login" className="button is-primary">
                <span className="icon">
                  <i className="fas fa-sign-in-alt" />
                </span>
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
