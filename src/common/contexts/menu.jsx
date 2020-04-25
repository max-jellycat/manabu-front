import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [collapsible] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <MenuContext.Provider
      value={{
        menuActive: active,
        collapsible,
        toggleMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => useContext(MenuContext);

MenuProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default useMenu;
