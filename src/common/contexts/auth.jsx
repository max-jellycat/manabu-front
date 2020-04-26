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

  const socialSignIn = async (provider, search) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/${provider}/callback${search}`);
    const resJson = await res.json();
    window.localStorage.setItem('jwt', resJson.jwt);
    setUser(resJson.user);
    router.push('/dashboard');
  };

  const login = async (email, password) => {
    const payload = {
      identifier: email,
      password,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const resJson = await res.json();

        if (resJson.user.confirmed) {
          window.localStorage.setItem('jwt', resJson.jwt);
          setUser(resJson.user);
          router.push('/dashboard');
        } else {
          setAlert(t('auth.notConfirmed'), 'warning');
        }
      } else {
        setAlert(t('auth.badCredentials'), 'danger');
      }
    } catch (err) {
      setAlert(err.message, 'danger');
    }
  };

  const register = async ({ name, email, password }) => {
    const payload = {
      username: name,
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
      setAlert(t('auth.emailSent'), 'success');
      router.push('/login');
    } else {
      setAlert(t('auth.badCredentials'), 'danger');
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.setItem('jwt', null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      socialSignIn,
      register,
      logout,
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
