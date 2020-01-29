import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const setAlert = (message, type) => {
    setState({
      message,
      type,
    });
  };

  const clearAlert = () => {
    setState(null);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
        clearAlert,
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
