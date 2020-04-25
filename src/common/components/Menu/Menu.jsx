import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from 'common/contexts/auth';
import useMenu from 'common/contexts/menu';


const Menu = () => {
  const { t } = useTranslation();
  const { menuActive } = useMenu();
  const { user, signout } = useAuth();

  return (
    <aside data-test="component-aside" className={`menu is-dark ${menuActive && 'is-open'}`}>
      <div className="menu-header">
        <div className="menu-user">
          {user && (
            <>
              <button className="menu-user--logout button is-danger is-transparent" onClick={() => signout()}>
                <span className="icon">
                  <i className="fas fa-power-off" />
                </span>
              </button>
              <div className="menu-user--name">
                <span className="ml has-text-weight-bold">{user.username}</span>
                <span className="icon">
                  <i className="fas fa-user" />
                </span>
              </div>
            </>
          )}
        </div>
        <Link className="menu-brand" to="/">
          <img src="http://placehold.it/600x400" alt="Home" />
        </Link>
        <div className="menu-header--mask" />
      </div>
      <div className="menu-container">
        <>
          <p className="menu-label">
            <span className="icon">
              <i className="fas fa-card" />
            </span>
            <span>{t('menu.flashCards')}</span>
          </p>
          <ul className="menu-list">
            <li>
              <Link to="/flash-cards">
                <span className="icon mr">
                  <i className="fas fa-card" />
                </span>
                <span>{t('menu.flashCards')}</span>
              </Link>
            </li>
          </ul>
        </>
      </div>
    </aside>
  );
};

export default withRouter(Menu);
