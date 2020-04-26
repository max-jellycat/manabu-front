import React from 'react';
import PropTypes from 'prop-types';

import Alerts from 'common/components/Alerts/Alerts';
import Navbar from 'common/components/Navbar/Navbar';
import Menu from 'common/components/Menu/Menu';
import useAuth from 'common/contexts/auth';
import useMenu from 'common/contexts/menu';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const { menuActive } = useMenu();

  return user ? (
    <div className="layout">
      <Menu />
      <main className={`${menuActive && 'menu-open'}`}>
        <Alerts />
        {children}
      </main>
    </div>
  ) : (
    <div className="layout">
      <Navbar />
      <main className="full-page">
        <Alerts />
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
