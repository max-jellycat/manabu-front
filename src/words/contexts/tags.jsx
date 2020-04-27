import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import ContextProvider from 'common/contexts/crud';

const TagContext = createContext();

export const TagsProvider = ({ children }) => (
  <ContextProvider url="tags" context={TagContext}>{children}</ContextProvider>
);

TagsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useTag = () => useContext(TagContext);

export default useTag;
