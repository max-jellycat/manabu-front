import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import ContextProvider from 'common/contexts/crud';

const WordContext = createContext();

export const WordsProvider = ({ children }) => (
  <ContextProvider url="words" context={WordContext}>{children}</ContextProvider>
);

WordsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

const useWord = () => useContext(WordContext);

export default useWord;
