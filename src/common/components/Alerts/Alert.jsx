import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Alert = ({ alert, clearAlert }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 3000);

    return () => clearTimeout(timer);
  }, [setShowAlert]);

  return (
    <CSSTransition
      in={showAlert}
      timeout={1000}
      classNames="alert"
      onExited={() => clearAlert(alert.id)}
    >
      <article className={`alert notification is-${alert.type}`}>
        <button type="button" className="delete" onClick={() => setShowAlert(false)}>
          <span className="icon">
            <i className="fas fa-times" />
          </span>
        </button>
        <span className="icon">
          <i
            className={`fas fa-${alert.type === 'danger' || alert.type === 'warning'
              ? 'exclamation-triangle' : 'info-circle'} mr-1`}
          />
        </span>
        <span>{alert.message}</span>
      </article>
    </CSSTransition>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  clearAlert: PropTypes.func.isRequired,
};

export default Alert;
