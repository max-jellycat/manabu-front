import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const unsubscribe = (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    };

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
};

export default useAuth;
