import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import Select from 'common/components/Select/Select';


const Input = ({
  type, icon, children, ...otherProps
}) => {
  const className = otherProps.className ? otherProps.className : '';

  switch (type) {
    case 'submit':
      return (
        <button className="button is-success" type="submit" disabled={otherProps.disabled}>
          {icon && (
            <span className="icon">
              <i className={`fas fa-${icon}`} />
            </span>
          )}
          <span>{otherProps.placeholder}</span>
        </button>
      );

    case 'select':
      return (<Select {...otherProps} />);

    case 'checkbox':
      return (
        <>
          <input
            id={otherProps.name}
            defaultValue={false}
            type="checkbox"
            {...otherProps}
            className={`is-checkradio ${className}`}
          />
          <label htmlFor={otherProps.name}>{otherProps.placeholder}</label>
        </>
      );

    case 'custom':
      return React.cloneElement(children, { ...otherProps });

    default:
      return (
        <input type={type} {...otherProps} className={`input ${className} `} />
      );
  }
};

Input.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.element,
};

Input.defaultProps = {
  type: 'text',
  icon: '',
  children: null,
};

// eslint-disable-next-line max-len
const composeValidators = (validators) => (value) => validators.reduce((error, validator) => error || validator(value), undefined);

const FormInput = ({
  icon, validate, required, placeholder, type, onChange, children, ...rest
}) => {
  const { t } = useTranslation();

  const reqRule = (value) => (value ? undefined : t('common.fieldRequired'));
  const checkboxReq = (value) => (value === true ? undefined : t('common.fieldRequired'));

  let validator = !validate && required ? reqRule : validate;

  validator = (type === 'checkbox' && required) ? checkboxReq : validator;

  if (Array.isArray(validator)) {
    if (validator.length) {
      validator = composeValidators(validator);
    } else {
      validator = null;
    }
  }

  const label = required ? `${placeholder} *` : placeholder;

  if (type === 'submit') {
    return (
      <div className="field">
        <div className="control">
          <Input
            type={type}
            icon={icon}
            placeholder={label}
            {...rest}
          />
        </div>
      </div>
    );
  }

  return (
    <Field
      type={type}
      icon={icon}
      validate={validator}
      placeholder={label}
      required={required}
      {...rest}
    >
      {({ input, meta, ...extra }) => {
        let { className } = extra;

        if (meta.touched && meta.error) {
          className = className ? `${className} is-danger` : 'is-danger';
        }

        return (
          <div className="field">
            <div className={`control ${icon && 'has-icons-left has-icons-right '}`}>
              <Input
                {...input}
                {...extra}
                className={className}
                onChange={(val, row) => {
                  onChange(val, row);
                  input.onChange(val);
                }}
              >
                {children}
              </Input>
              {icon && (
                <span className="icon is-small is-left">
                  <i className={`fas fa-${icon}`} />
                </span>
              )}
              {icon && meta.touched && meta.error && (
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              )}
            </div>
            {meta.touched && meta.error && (<p className="help is-danger">{meta.error}</p>)}
          </div>
        );
      }}
    </Field>
  );
};

FormInput.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.element,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  required: PropTypes.bool,
};

FormInput.defaultProps = {
  type: 'text',
  icon: '',
  placeholder: '',
  onChange() {},
  children: null,
  validate: null,
  required: false,
};

export default FormInput;
