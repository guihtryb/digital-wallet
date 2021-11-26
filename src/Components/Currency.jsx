import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletExpenses } from '../actions/index';
import AddExpenseButton from './AddExpenseButton';
import ExpensesTable from './ExpensesTable';
import '../Styles/ExpensesTable.css';
import '../Styles/Currency.css';
import ExpensesInput from './ExpensesInput';
import ExpensesSelect from './ExpensesSelect';

class Currency extends Component {
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
    this.AddExpenseHelper = this.AddExpenseHelper.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exchangeRatesRequisition = this.exchangeRatesRequisition.bind(this);
    this.renderExpenseBoard = this.renderExpenseBoard.bind(this);
    this.renderExpensesTableHeader = this.renderExpensesTableHeader.bind(this);
  }

  componentDidMount() {
    // this.exchangeRatesRequisition();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
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

  AddExpenseHelper() {
    const { walletAction } = this.props;
    const { value,
      currency, id, description, method, tag, exchangeRates } = this.state;
    walletAction({ id,
      description,
      method,
      tag,
      value,
      currency,
      exchangeRates,
    });
  }

  async addExpense() {
    await this.exchangeRatesRequisition();
    const { walletAction } = this.props;
    const { value, currency, exchangeRates, id } = this.state;

    const { description, method, tag } = this.state;
    walletAction({ id, description, method, tag, value, currency, exchangeRates });

    this.setState(({
      id: id + 1,
    }));
  }

  renderExpenseBoard() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const { handleChange, addExpense, handleSubmit } = this;
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
            name="payment method"
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
            addExpense={ addExpense }
          />
        </div>
      </form>
    );
  }

  renderExpensesTableHeader() {
    const tableHeaders = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Excluir'];

    return (
      <tr>
        { tableHeaders.map((header) => (
          <th key={ header }>
            { header }
          </th>)) }
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        { this.renderExpenseBoard() }
        <table className="expenses-table">
          { this.renderExpensesTableHeader() }
          { expenses.map((expense) => (<ExpensesTable
            expense={ expense }
            key={ expense.id }
          />))}
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  walletAction: (expenses) => dispatch(walletExpenses(expenses)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Currency);

Currency.propTypes = {
  expenses: PropTypes.objectOf(PropTypes.string).isRequired,
  walletAction: PropTypes.func.isRequired,
};
