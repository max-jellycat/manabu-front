import React, { useContext } from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useAuth } from 'auth/hooks/use-auth';
import useRouter from 'common/hooks/use-router';
import FormInput from 'common/components/FormInput/FormInput';

import AlertContext from 'common/context/alert';

const SignUp = () => {
  const auth = useAuth();
  const router = useRouter();
  const { setAlert } = useContext(AlertContext);

  const onSubmit = ({
    name, email, password, passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      setAlert("Passwords don't match.", 'danger');
    } else {
      const errors = auth.signup({ name, email, password });
      if (!errors.length) {
        setAlert('You are now logged in.', 'success');
        router.push('/');
      } else {
        errors.forEach((e) => setAlert(e, 'danger'));
      }
    }
  };

  return (
    <section className="register-page">
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
