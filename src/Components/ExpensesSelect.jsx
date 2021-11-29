import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExpensesSelect extends Component {
  render() {
    const { name, onChange, info, data } = this.props;
    const id = name === 'currency' ? 'coin' : name;
    return (
      <label htmlFor={ name } className="expenses-select">
        { `${name[0].toUpperCase()}${name.substring(1, name.length)}` }
        <select
          name={ name }
          id={ id }
          onChange={ onChange }
          value={ info }
        >
          { name === 'currency' ? data.map(({ code }) => (
            <option key={ code }>
              {code}
            </option>))
            : data.map((item) => (
              <option key={ item }>
                {item}
              </option>))}
        </select>
      </label>
    );
  }
}

ExpensesSelect.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
