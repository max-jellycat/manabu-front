import React from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';

import useAuth from 'common/contexts/auth';
import useAlert from 'common/contexts/alerts';
import FormInput from 'common/components/FormInput/FormInput';

const SignIn = () => {
  const { login } = useAuth();
  const { setAlert } = useAlert;

  const onSubmit = async ({ email, password }) => {
    const user = await login(email, password);
    user && setAlert('Login successful.', 'primary');
  };

  const providers = ['google', 'facebook'];

  return (
    <section className="section full-page form-page">
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
            <div className="social-buttons">
              {providers.map((p) => (
                <a
                  key={`connect-${p}`}
                  href={`${process.env.REACT_APP_API_URL}/connect/${p}`}
                  className={`button is-${p}`}
                >
                  <span className="icon">
                    <i className={`fab fa-${p}`} />
                  </span>
                  <span style={{ textTransform: 'capitalize' }}>{`Connect with ${p}`}</span>
                </a>
              ))}
            </div>
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
