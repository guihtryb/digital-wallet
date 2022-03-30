import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/TableCell.css';
import { connect } from 'react-redux';
import { deleteExpenseAction, editExpenseAction } from '../actions';
import changes from '../utils/changes';

class TableCell extends Component {
  constructor() {
    super();
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  deleteExpense() {
    const { expense: { id } } = this.props;
    const { deleteExpenses, editExpenses, expenses } = this.props;
    const arrayFiltered = expenses.filter((exp) => exp.id !== id);
    if (arrayFiltered.length < 1) editExpenses('Adicionar despesa');
    deleteExpenses(arrayFiltered);
  }

  editExpense() {
    const { editExpenses, expense: { id } } = this.props;
    editExpenses('Editar despesa', id);
  }

  render() {
    const { expense: { exchangeRates,
      currency, description, tag, method, value } } = this.props;
    const currencies = Object.values(exchangeRates);
    const correctCurrency = currencies.filter((curr) => curr.code === currency);
    const calc = Number(value) * correctCurrency[0].ask;
    const precision = 100;
    const correctExpense = parseInt(calc * precision, 10) / precision;
    const cambio = currencies.filter((exc) => exc.code === currency)[0].ask;

    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{`${parseInt(value, 10)}`}</td>
        <td>{changes[currency]}</td>
        <td>{parseFloat(cambio).toFixed(2)}</td>
        <td>{correctExpense}</td>
        <td>Real</td>
        <td>
          <button
            type="button"
            data-testid="delete-btn"
            className="delete-button"
            onClick={ this.deleteExpense }
          >
            Delete
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            className="delete-button"
            onClick={ this.editExpense }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (expenses) => dispatch(
    deleteExpenseAction(expenses),
  ),
  editExpenses: (buttonText, idToEdit) => dispatch(
    editExpenseAction(buttonText, idToEdit),
  ),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);

TableCell.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string).isRequired,
  expense: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};
