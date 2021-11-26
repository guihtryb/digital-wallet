import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExpensesInput extends Component {
  render() {
    const { name, type, info, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        { name }
        <input
          type={ type }
          name={ name }
          id={ name }
          onChange={ onChange }
          value={ info }
        />
      </label>
    );
  }
}

ExpensesInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
