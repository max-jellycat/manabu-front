import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Icon } from '@iconify/react';
import speedometerIcon from '@iconify/icons-ion/speedometer';
import languageIcon from '@iconify/icons-ion/language';
import albumsIcon from '@iconify/icons-ion/albums';
import pricetagsIcon from '@iconify/icons-ion/pricetags';
import personCircle from '@iconify/icons-ion/person-circle';
import powerIcon from '@iconify/icons-ion/power';


import useAuth from 'common/contexts/auth';
import useMenu from 'common/contexts/menu';


const Menu = () => {
  const { t } = useTranslation();
  const { menuActive } = useMenu();
  const { user, logout } = useAuth();

  const links = [
    {
      label: t('dashboard.dashboardTitle'),
      icon: speedometerIcon,
      link: '/dashboard',
    },
    {
      label: t('words.wordsTitle'),
      icon: languageIcon,
      link: '/words',
      children: [
        {
          label: t('tags.tagsTitle'),
          icon: pricetagsIcon,
          link: '/tags',
        },
      ],
    },
    {
      label: t('flashCards.flashCardsTitle'),
      icon: albumsIcon,
      link: '/flash-cards',
    },
  ];

  return (
    <aside data-test="component-aside" className={`menu is-dark ${menuActive && 'is-open'}`}>
      <div className="menu-header">
        <div className="menu-user">
          {user && (
            <>
              <button className="menu-user--logout button is-danger is-transparent" onClick={() => logout()}>
                <span className="icon">
                  <Icon icon={powerIcon} />
                </span>
              </button>
              <div className="menu-user--name">
                <span className="ml has-text-weight-bold">{user.username}</span>
                <span className="icon">
                  <Icon icon={personCircle} />
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
          {links.map((link, index) => (
            <Fragment key={`link-${index}`}>
              <p className="menu-label">
                <Link to={link.link}>
                  <span className="icon mr">
                    <Icon icon={link.icon} />
                  </span>
                  <span>{link.label}</span>
                </Link>
              </p>
              {
              link.children?.length && (
                <ul className="menu-list">
                  {link.children.map((child, index) => (
                    <li key={`child-link-${index}`}>
                      <Link to={child.link}>
                        <span className="icon mr">
                          <Icon icon={child.icon} />
                        </span>
                        <span>{child.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            }
            </Fragment>
          ))}
        </>
      </div>
    </aside>
  );
};

export default withRouter(Menu);
