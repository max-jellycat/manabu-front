import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

const FormInput = ({
  type, name, placeholder, icon, disabled,
}) => (
  <div className="field">
    <div className={`control ${icon && type !== 'submit' && 'has-icons-left'}`}>
      {type !== 'submit' ? (
        <>
          <Field type={type} name={name} className="input" component="input" placeholder={placeholder} />
          {icon && (
            <span className="icon is-small is-left">
              <i className={`fas fa-${icon}`} />
            </span>
          )}
        </>
      ) : (
        <button className="button is-success" type={type} disabled={disabled}>
          {icon && (
            <span className="icon">
              <i className={`fas fa-${icon}`} />
            </span>
          )}
          <span>{placeholder}</span>
        </button>
      )}
    </div>
  </div>
);

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
};

FormInput.defaultProps = {
  type: 'text',
  name: 'input',
  icon: '',
  placeholder: '',
  disabled: false,
};

export default FormInput;
