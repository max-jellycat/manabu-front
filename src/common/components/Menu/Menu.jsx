import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from 'common/contexts/auth';
import useMenu from 'common/contexts/menu';


const Menu = () => {
  const { t } = useTranslation();
  const { menuActive } = useMenu();
  const { user, logout } = useAuth();

  return (
    <aside data-test="component-aside" className={`menu is-dark ${menuActive && 'is-open'}`}>
      <div className="menu-header">
        <div className="menu-user">
          {user && (
            <>
              <button className="menu-user--logout button is-danger is-transparent" onClick={() => logout()}>
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
        <Link className="menu-brand" to="/" style={{ backgroundImage: 'url(http://placehold.it/600x400)' }} />
        <div className="menu-header--mask" />
      </div>
      <div className="menu-container">
        <>
          <p className="menu-label">
            <Link to="/dashboard">
              <span className="icon mr">
                <i className="fas fa-tachometer-alt" />
              </span>
              <span>{t('dashboard.dashboardTitle')}</span>
            </Link>
          </p>
          <p className="menu-label">
            <Link to="/words">
              <span className="icon mr">
                <i className="fas fa-heading" />
              </span>
              <span>{t('words.wordsTitle')}</span>
            </Link>
          </p>
          <p className="menu-label">
            <Link to="/flash-cards">
              <span className="icon mr">
                <i className="fas fa-dice" />
              </span>
              <span>{t('flashCards.flashCardsTitle')}</span>
            </Link>
          </p>
        </>
      </div>
    </aside>
  );
};

export default withRouter(Menu);
