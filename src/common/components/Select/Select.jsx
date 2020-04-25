import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import Async from 'react-select/async';
import { useTranslation } from 'react-i18next';

/**
 * Override of React Select :
 * - return option.value instead of option (obj) (works also with multiple values instead of array of option)
 *   To be able to initialize more quickly a select in a form
 * - onChange will returns also the full option (row) as second arguments, onChange(opt.value,opt)
 * - Default placeholder
 * - Clearable by default, except if required
 * - Default NoResult Message (intl)
 * - Default PlaceHolder Message (intl)
 * - Close Menu on Select except if Multiple
 * - disabled and multiple props instea of multi and isDisabled for more common name
 */
const Select = ({
  value,
  onChange,
  multiple,
  loadOptions,
  clearable,
  disabled,
  required,
  placeholder,
  options,
  defaultOptions,
  children,
  ...rest
}) => {
  const { t } = useTranslation();

  const handleChange = useCallback((val) => {
    let value;

    if (!val) {
      value = val;
    } else if (Array.isArray(val)) {
      value = val.map((item) => item.value);
    } else {
      value = val.value;
    }

    if (multiple && !Array.isArray(value)) {
      value = [value];
    }

    onChange(value, val);
  }, [onChange, multiple]);

  const selectedOption = useMemo(() => {
    if (!value) return value;

    const opts = options || defaultOptions || [];

    if (multiple) {
      return opts.filter((opt) => value.includes(opt.value));
    }

    return opts.find((opt) => opt.value === value);
  }, [value, multiple, options, defaultOptions]);

  let isClearable = clearable;

  if (required) {
    isClearable = false;
  }

  let placeholderMsg = placeholder;

  if (placeholder === null) {
    placeholderMsg = loadOptions ? t('common.typeToSearch') : t('common.placeholderSelect');
  }

  const customSelectStyles = {
    menu: (provided) => ({ ...provided, zIndex: 100 }),
    control: (base, state) => ({
      ...base,
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: state.isFocused
        ? '#009ad4'
        : '#ecf0f1',
      '&:hover': {
        borderColor: state.isFocused
          ? '#009ad4'
          : '#cfcfcf',
      },
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused
        ? '#009ad4'
        : '#cfcfcf',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#cfcfcf',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'white' : '#1d1c26',
      '&:hover': {
        backgroundColor: '#009ad4',
        color: '#f5f5f5',
      },
    }),
  };

  const Component = loadOptions ? Async : ReactSelect;

  return (
    <Component
      loadOptions={loadOptions}
      value={selectedOption}
      onChange={handleChange}
      noOptionsMessage={() => t('common.noResult')}
      loadingMessage={() => t('common.loading')}
      closeMenuOnSelect={!multiple}
      placeholder={placeholderMsg}
      isMulti={multiple}
      isDisabled={disabled}
      isClearable={isClearable}
      options={options}
      defaultOptions={defaultOptions}
      styles={customSelectStyles}
      {...rest}
    >
      {children}
    </Component>
  );
};


Select.propTypes = {
  loadOptions: PropTypes.func,
  value: PropTypes.any,
  children: PropTypes.element,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array,
  defaultOptions: PropTypes.array,
};

Select.defaultProps = {
  loadOptions: null,
  value: null,
  onChange() {},
  children: null,
  multiple: false,
  clearable: true,
  placeholder: null,
  disabled: false,
  required: false,
  options: null,
  defaultOptions: null,
};

export default Select;
