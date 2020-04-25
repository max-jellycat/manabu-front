import React, {
  useState, createContext, useContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

const AlertsContext = createContext();

export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const setAlert = useCallback((message, type) => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      {
        id: uuid(),
        message,
        type,
      },
    ]);
  }, [setAlerts]);

  const clearAlerts = () => {
    setAlerts([]);
  };

  const clearAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        setAlert,
        clearAlerts,
        clearAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

AlertsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useAlert = () => useContext(AlertsContext);

export default useAlert;
