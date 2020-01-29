import React, {
  useEffect, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import createPersistedState from 'use-persisted-state';

import useRouter from 'common/hooks/use-router';

const authContext = createContext();
const usePersistedState = createPersistedState('user');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = usePersistedState(null);
  const router = useRouter();
  let errors = [];

  const signin = (email, password) => {
    errors = [];
    fetch(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      res.json()
        .then((users) => {
          const user = users.find((u) => u.email === email);
          if (user) {
            if (user.password === password) {
              setUser(user);
              router.push('/');
            } else {
              errors.push('Invalid credentials.');
            }
          } else {
            errors.push('User not found in database.');
          }
        })
        .catch((err) => errors.push(err));
    }).catch((err) => errors.push(err));

    return errors;
  };

  const signup = ({ name, email, password }) => {
    errors = [];
    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: 'user',
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json()
            .then((user) => {
              setUser(user);
              router.push('/');
            })
            .catch((err) => errors.push(err));
        }
      })
      .catch((err) => errors.push(err));
    return errors;
  };

  const signout = () => {
    setUser(null);
  };

  useEffect(() => () => setUser(null), []);
  return (
    <authContext.Provider value={{
      user,
      signin,
      signup,
      signout,
    }}
    >
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => useContext(authContext);

export default useAuth;
