import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/use-auth';
import FormInput from 'components/FormInput/FormInput';

import AlertContext from 'context/alert';

const SignUp = () => {
  const auth = useAuth();
  const { setAlert } = useContext(AlertContext);

  const onSubmit = async ({
    name, email, password, passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      setAlert("Passwords don't match.", 'danger');
    } else {
      const user = await auth.signup({ name, email, password });
      user && setAlert('Login successful.', 'primary');
    }
  };

  return (
    <section className="section register-page">
      <Form
        onSubmit={onSubmit}
        initialValues={{
          name: '', email: '', password: '', passwordConfirm: '',
        }}
        render={({ handleSubmit, submitting, pristine }) => (
          <>
            <form onSubmit={handleSubmit}>
              <FormInput
                name="name"
                placeholder="Name"
                icon="user"
              />
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
                type="password"
                name="passwordConfirm"
                placeholder="Password Confirmation"
                icon="check"
              />
              <FormInput
                type="submit"
                placeholder="Register"
                icon="user-plus"
                disabled={submitting || pristine}
              />
            </form>
            <p className="mt-1">
              <span>Already have an account ? </span>
              <Link to="/login" className="lead">Sign in here.</Link>
            </p>
          </>
        )}
      />
    </section>
  );
};

export default SignUp;
