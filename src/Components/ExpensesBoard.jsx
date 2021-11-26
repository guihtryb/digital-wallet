import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpenseButton from './AddExpenseButton';
import ExpensesInput from './ExpensesInput';
import { walletExpenses } from '../actions/index';
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
    this.addExpense = this.addExpense.bind(this);
    this.AddExpenseHelper = this.AddExpenseHelper.bind(this);
  }

  componentDidMount() {
    // this.exchangeRatesRequisition();
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

  render() {
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
            addExpense={ addExpense }
          />
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  walletAction: (expenses) => dispatch(walletExpenses(expenses)),
});

export default connect(mapDispatchToProps)(ExpensesBoard);

ExpensesBoard.propTypes = {
  walletAction: PropTypes.func.isRequired,
};
