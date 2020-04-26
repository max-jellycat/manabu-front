import React from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from 'common/contexts/auth';
import useAlert from 'common/contexts/alerts';
import FormInput from 'common/components/FormInput/FormInput';

const SignUp = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const { setAlert } = useAlert();

  const onSubmit = async ({
    name, email, password, passwordConfirm,
  }) => {
    if (password !== passwordConfirm) {
      setAlert(t('auth.noPasswordsMatch'), 'danger');
    } else {
      await register({ name, email, password });
    }
  };

  return (
    <section className="section full-page form-page">
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
                placeholder={t('auth.name')}
                icon="user"
              />
              <FormInput
                type="email"
                name="email"
                placeholder={t('auth.email')}
                icon="envelope"
              />
              <FormInput
                type="password"
                name="password"
                placeholder={t('auth.password')}
                icon="lock"
              />
              <FormInput
                type="password"
                name="passwordConfirm"
                placeholder={t('auth.confirmPassword')}
                icon="check"
              />
              <FormInput
                type="submit"
                placeholder={t('auth.register')}
                icon="user-plus"
                disabled={submitting || pristine}
              />
            </form>
            <p className="mt-1">
              <span className="mr">{t('auth.alreadySignedUp')}</span>
              <Link to="/login" className="lead">{t('auth.loginLink')}</Link>
            </p>
          </>
        )}
      />
    </section>
  );
};

export default SignUp;
