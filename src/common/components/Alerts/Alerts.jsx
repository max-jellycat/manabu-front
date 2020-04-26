import React from 'react';

import useAlert from 'common/contexts/alerts';
import Alert from 'common/components/Alerts/Alert';

const Alerts = () => {
  const { alerts, clearAlert } = useAlert();

  return (
    <section className={`${alerts.length > 0 && 'mt-2'} alerts`}>
      {alerts.length > 0 && alerts.map((alert) => (
        <Alert key={`${alert.id}`} alert={alert} clearAlert={clearAlert} />
      ))}
    </section>
  );
};

export default Alerts;
