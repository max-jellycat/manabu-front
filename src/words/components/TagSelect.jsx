/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import useAuth from 'common/contexts/auth';
import Select from 'react-select/async-creatable';

const TagSelect = ({
  onChange, fetchItems, save, ...rest
}) => {
  const { user } = useAuth();
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const loadOptions = async (value, callback) => {
    const options = await fetchItems();
    const processOptions = options.map((t) => ({ label: t.label, value: t.id }));

    setTimeout(() => {
      callback(processOptions);
    }, 1000);
  };

  const handleChange = async (value, actionMeta) => {
    let newValue = value;

    if (actionMeta.action === 'create-option') {
      const newEntry = await createNewEntry();

      newValue = value.map((v) => v.label === newEntry.label ? ({ label: v.label, value: newEntry.id }) : v);
    }
    onChange(value);
    setValue(newValue);
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const createNewEntry = async () => {
    const newTag = await save({ label: inputValue, user: user.id });

    setInputValue('');
    return newTag;
  };

  const customSelectStyles = {
    menu: (provided) => ({ ...provided, zIndex: 100 }),
    control: (base, state) => ({
      ...base,
      paddingLeft: '2.25em',
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: state.isFocused
        ? '#14d4f4'
        : '#dddddd',
      '&:hover': {
        borderColor: state.isFocused
          ? '#14d4f4'
          : '#cfcfcf',
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused
        ? '#14d4f4'
        : '#cfcfcf',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#cfcfcf',
      margin: 0,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'white' : '#1d1c26',
      '&:hover': {
        backgroundColor: '#14d4f4',
        color: '#f5f5f5',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
  };

  return (
    <Select
      {...rest}
      className="react-select-container"
      classNamePrefix="react-select"
      isMulti
      isClearable
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      value={value}
      styles={customSelectStyles}
    />
  );
};

export default TagSelect;
