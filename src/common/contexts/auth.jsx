import React, { useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import createPersistedState from 'use-persisted-state';
import { useTranslation } from 'react-i18next';

import useRouter from 'common/hooks/use-router';
import useAlert from 'common/contexts/alerts';

const AuthContext = createContext();
const usePersistedState = createPersistedState('user');

export const AuthProvider = ({ children }) => {
  const { t } = useTranslation();
  const [user, setUser] = usePersistedState(null);
  const { setAlert } = useAlert();
  const router = useRouter();

  const signin = async (email, password) => {
    const payload = {
      identifier: email,
      password,
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const resJson = await res.json();

      window.localStorage.setItem('jwt', resJson.jwt);
      setUser(resJson.user);
      router.push('/');
    } else {
      // TODO  fix : error not displayed
      setAlert(t('auth.badCredentials'), 'danger');
    }
  };

  const signup = async ({ name, email, password }) => {
    const payload = {
      username: email,
      name,
      email,
      password,
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const user = await res.json();

      setUser(user);
      router.push('/');
    }
    // TODO handle register error
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      signin,
      signup,
      signout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
