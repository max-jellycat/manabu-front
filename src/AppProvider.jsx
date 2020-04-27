import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import { AlertsProvider } from 'common/contexts/alerts';
import { AuthProvider } from 'common/contexts/auth';
import { MenuProvider } from 'common/contexts/menu';
import { WordsProvider } from 'words/contexts/words';
import { TagsProvider } from 'words/contexts/tags';

import Loader from 'common/components/Loader/Loader';

const AppProvider = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <AlertsProvider>
      <AuthProvider>
        <MenuProvider>
          <TagsProvider>
            <WordsProvider>
              {children}
            </WordsProvider>
          </TagsProvider>
        </MenuProvider>
      </AuthProvider>
    </AlertsProvider>
  </Suspense>
);

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
