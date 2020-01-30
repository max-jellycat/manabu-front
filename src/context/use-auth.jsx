import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase/app';
import createPersistedState from 'use-persisted-state';
import 'firebase/auth';
import 'firebase/firestore';

import AlertContext from 'context/alert';
import useRouter from 'hooks/use-router';

const usePersistedState = createPersistedState('user');

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appID: process.env.REACT_APP_APP_ID,
});

const db = firebase.firestore();

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setAlert } = useContext(AlertContext);

  const router = useRouter();

  const signin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const userRef = db.collection('users').doc(res.user.uid);
        userRef.get().then((user) => {
          const userObj = {
            ...user.data(),
            id: user.id,
          };
          setUser(userObj);
          router.push('/');
          return userObj;
        });
      }).catch((err) => setAlert(err.message, 'danger'));
  };

  const signup = ({ name, email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        db.collection('users')
          .doc(response.user.uid)
          .set({
            displayName: name,
            email: response.user.email,
          }).then((user) => {
            setUser(user);
            router.push('/');
            return user;
          })
          .catch((err) => setAlert(err.message, 'danger'));
      })
      .catch((err) => setAlert(err.message, 'danger'));
  };

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(false);
    });

  const sendPasswordResetEmail = (email) => firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => true);

  const confirmPasswordReset = (code, password) => firebase
    .auth()
    .confirmPasswordReset(code, password)
    .then(() => true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      !user && setUser(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider value={{
      user,
      signin,
      signup,
      signout,
      sendPasswordResetEmail,
      confirmPasswordReset,
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
