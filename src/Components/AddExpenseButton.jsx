import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddExpenseButton extends Component {
  render() {
    const { addExpense } = this.props;
    return (
      <div>
        <button className="add-button" type="submit" onClick={ addExpense }>
          adicionar despesa
        </button>
      </div>
    );
  }
}

AddExpenseButton.propTypes = {
  addExpense: PropTypes.func.isRequired,
};
