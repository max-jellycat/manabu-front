import React from 'react';

import useAlert from 'common/contexts/alerts';

const Alerts = () => {
  const { alerts, clearAlerts } = useAlert();
  return (
    <section className="alerts">
      {alerts.length > 0 && alerts.map((alert, index) => (
        <article key={`${alert.type}-${index}`} className={`notification is-lighter is-${alert.type}`}>
          <button type="button" className="delete" onClick={() => clearAlerts}>
            <span className="icon">
              <i className="fas fa-times" />
            </span>
          </button>
          <span className="icon">
            <i className={`fas fa-${alert.type === 'danger' || alert.type === 'warning' ? 'exclamation-triangle' : 'info-circle'} mr-1`} />
          </span>
          <span>{alert.message}</span>
        </article>
      ))}
    </section>
  );
};

export default Alerts;
