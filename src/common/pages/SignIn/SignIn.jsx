import React from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from 'common/contexts/auth';
import FormInput from 'common/components/FormInput/FormInput';

const SignIn = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const onSubmit = async ({ email, password }) => {
    await login(email, password);
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
                type="submit"
                placeholder={t('auth.login')}
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
                  <span style={{ textTransform: 'capitalize' }}>{t('auth.socialConnect', { provider: p })}</span>
                </a>
              ))}
            </div>
            <p className="mt-1">
              <span className="mr">{t('auth.notSignedUp')}</span>
              <Link to="/register" className="lead">{t('auth.signUpLink')}</Link>
            </p>
          </>
        )}
      />
    </section>
  );
};

export default SignIn;
