import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const setAlert = (message, type) => {
    setAlerts([
      ...alerts,
      {
        message,
        type,
      },
    ]);
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        setAlert,
        clearAlerts,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AlertContext;
