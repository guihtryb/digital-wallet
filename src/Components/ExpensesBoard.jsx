import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpenseButton from './AddExpenseButton';
import ExpensesInput from './ExpensesInput';
import { deleteExpenseAction, editExpenseAction, walletExpenses } from '../actions/index';
import ExpensesSelect from './ExpensesSelect';

class ExpensesBoard extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: 'none',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.exchangeRatesRequisition = this.exchangeRatesRequisition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addOrEditExpenses = this.addOrEditExpenses.bind(this);
  }

  componentDidMount() {
    this.exchangeRatesRequisition();
  }

  async exchangeRatesRequisition() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    this.setState({
      exchangeRates: data,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async addOrEditExpenses() {
    await this.exchangeRatesRequisition();
    const { walletAction, buttonText, idToEdit,
      expenses, deleteExpenses, editExpenses } = this.props;
    const { value, currency, exchangeRates, id } = this.state;

    const { description, method, tag } = this.state;
    if (buttonText === 'Adicionar despesa') {
      walletAction({ id, description, method, tag, value, currency, exchangeRates });
      this.setState(({
        id: id + 1,
      }));
    } else {
      const getExpenseToEdit = {
        id: idToEdit,
        description,
        exchangeRates,
        currency,
        method,
        tag,
        value,
      };

      const deleteOldValue = expenses.filter((expense) => expense.id !== idToEdit);
      const expensesEdited = [...deleteOldValue, getExpenseToEdit];
      expensesEdited.sort((a, b) => a.id - b.id);
      console.log(deleteOldValue, expensesEdited);
      deleteExpenses(expensesEdited);
      editExpenses('Adicionar despesa');
    }
  }

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const { handleChange, addOrEditExpenses, handleSubmit } = this;
    const paymentMethods = ['Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const currencyCodes = Object.values(exchangeRates);

    return (
      <form onSubmit={ handleSubmit }>
        <div className="wallet-container">
          <ExpensesInput
            name="value"
            type="number"
            info={ value }
            onChange={ handleChange }
          />
          <ExpensesInput
            name="description"
            type="text"
            info={ description }
            onChange={ handleChange }
          />
          <ExpensesSelect
            name="currency"
            onChange={ handleChange }
            info={ currency }
            data={ currencyCodes }
          />
          <ExpensesSelect
            name="method"
            onChange={ handleChange }
            info={ method }
            data={ paymentMethods }
          />
          <ExpensesSelect
            name="tag"
            onChange={ handleChange }
            info={ tag }
            data={ tags }
          />
          <AddExpenseButton
            addExpense={ addOrEditExpenses }
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  buttonText: state.wallet.buttonText,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  walletAction: (expenses) => dispatch(walletExpenses(expenses)),
  deleteExpenses: (expenses) => dispatch(
    deleteExpenseAction(expenses),
  ),
  editExpenses: (buttonText) => dispatch(
    editExpenseAction(buttonText),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesBoard);

ExpensesBoard.propTypes = {
  walletAction: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  idToEdit: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
  editExpenses: PropTypes.func.isRequired,
};
