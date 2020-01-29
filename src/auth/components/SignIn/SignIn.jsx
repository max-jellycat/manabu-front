import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';

import { useAuth } from 'auth/context/use-auth';
import AlertContext from 'common/context/alert';
import FormInput from 'common/components/FormInput/FormInput';

const SignIn = () => {
  const auth = useAuth();
  const { setAlert } = useContext(AlertContext);

  const onSubmit = async ({ email, password }) => {
    const errors = await auth.signin(email, password);
    if (!errors.length) {
      setAlert('Login successful.', 'success');
    } else {
      errors.forEach((e) => setAlert(e, 'danger'));
    }
  };

  return (
    <section className="login-page">
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: '', password: '' }}
        render={({ handleSubmit, submitting, pristine }) => (
          <>
            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email address"
                icon="envelope"
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                icon="lock"
              />
              <FormInput
                type="submit"
                placeholder="Sign in"
                icon="sign-in-alt"
                disabled={submitting || pristine}
              />
            </form>
            <p className="mt-1">
              <span>Already have an account ? </span>
              <Link to="/register" className="lead">Sign up here.</Link>
            </p>
          </>
        )}
      />
    </section>
  );
};

export default SignIn;
