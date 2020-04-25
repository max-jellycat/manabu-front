import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import { AlertsProvider } from 'common/contexts/alerts';
import { AuthProvider } from 'common/contexts/auth';
import { MenuProvider } from 'common/contexts/menu';

import Loader from 'common/components/Loader/Loader';

const AppProvider = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <AlertsProvider>
      <AuthProvider>
        <MenuProvider>
          {children}
        </MenuProvider>
      </AuthProvider>
    </AlertsProvider>
  </Suspense>
);

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
