import React, { useContext } from 'react';

import AlertContext from 'common/context/alert';

const Alert = () => {
  const { alert, clearAlert } = useContext(AlertContext);
  return (
    alert !== null && (
      <article className={`notification is-lighter is-${alert.type}`}>
        <button type="button" className="delete" onClick={clearAlert}>
          <span className="icon">
            <i className="fas fa-times" />
          </span>
        </button>
        <span className="icon">
          <i className={`fas fa-${alert.type === 'danger' || alert.type === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-1`} />
        </span>
        <span>{alert.message}</span>
      </article>
    )
  );
};

export default Alert;
