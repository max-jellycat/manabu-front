import React from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';
import mailIcon from '@iconify/icons-ion/mail';
import lockClosed from '@iconify/icons-ion/lock-closed';
import logIn from '@iconify/icons-ion/log-in';
import logoGoogle from '@iconify/icons-ion/logo-google';
import logoFacebook from '@iconify/icons-ion/logo-facebook';


import useAuth from 'common/contexts/auth';
import FormInput from 'common/components/FormInput/FormInput';

const SignIn = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const onSubmit = async ({ email, password }) => {
    await login(email, password);
  };

  const providers = [
    { label: 'google', icon: logoGoogle },
    { label: 'facebook', icon: logoFacebook },
  ];

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
                icon={mailIcon}
                required
              />
              <FormInput
                type="password"
                name="password"
                placeholder={t('auth.password')}
                icon={lockClosed}
                required
              />
              <FormInput
                type="submit"
                placeholder={t('auth.login')}
                icon={logIn}
                disabled={submitting || pristine}
              />
            </form>
            <div className="social-buttons">
              {providers.map((p) => (
                <a
                  key={`connect-${p.label}`}
                  href={`${process.env.REACT_APP_API_URL}/connect/${p.label}`}
                  className={`button is-${p.label}`}
                >
                  <span className="icon">
                    <Icon icon={p.icon} />
                  </span>
                  <span style={{ textTransform: 'capitalize' }}>{t('auth.socialConnect', { provider: p.label })}</span>
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
