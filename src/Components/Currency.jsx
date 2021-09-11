import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletExpenses } from '../actions/index';
import AddExpenseButton from './AddExpenseButton';

class Currency extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
      exchangeRates: {},
      despesas: 0,
    };
    this.AddExpenseHelper = this.AddExpenseHelper.bind(this);
    this.chang = this.chang.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exchangeRatesRequisition = this.exchangeRatesRequisition.bind(this);
  }

  componentDidMount() {
    this.exchangeRatesRequisition();
  }

  chang({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  async addExpense() {
    this.exchangeRatesRequisition();
    const precision = 100;
    const { value, currency, exchangeRates } = this.state;
    const correctlyCurrency = Object.values(exchangeRates)
      .filter((rate) => rate.code === currency);
    const expense = Number(value) * correctlyCurrency[0].ask;
    const { despesas } = this.state;
    const calc = (parseInt(despesas * precision, 10)
    + parseInt(expense * precision, 10)) / precision;

    await this.setState((prevState) => ({
      ...prevState,
      despesas: calc,
    }));

    this.setState(({ id }) => ({
      id: id + 1,
    }), this.AddExpenseHelper());
  }

  AddExpenseHelper() {
    const { expensesAction } = this.props;
    const { value,
      currency, exchangeRates, id, description, method, tag, despesas } = this.state;
    console.log(id, despesas);
    expensesAction({ id, description, method, tag, value, currency, exchangeRates },
      despesas);
  }

  async exchangeRatesRequisition() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    this.setState({
      exchangeRates: data,
    });
  }

  render() {
    const { value, description, currency, method, tag, exchangeRates } = this.state;
    const { chang, addExpense, handleSubmit } = this;
    return (
      <form className="wallet-container" onSubmit={ handleSubmit }>
        <label htmlFor="v">
          Valor
          <input type="number" name="value" id="v" onChange={ chang } value={ value } />
        </label>
        <label htmlFor="d">
          Descrição
          <input
            type="text"
            name="description"
            id="d"
            onChange={ this.chang }
            value={ description }
          />
        </label>
        <label htmlFor="c">
          Moeda
          <select name="currency" id="c" onChange={ this.chang } value={ currency }>
            {Object.values(exchangeRates).map(({ code, name }) => (
              <option key={ name }>
                {code}
              </option>))}
          </select>
        </label>
        <label htmlFor="pt">
          Método de pagamento
          <select name="method" id="pt" onChange={ this.chang } value={ method }>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="ps">
          Tag
          <select name="tag" id="ps" onChange={ this.chang } value={ tag }>
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Trasporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <AddExpenseButton addExpense={ addExpense } />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expensesAction: (expenses, despesas) => dispatch(walletExpenses(expenses, despesas)),
});

export default connect(null, mapDispatchToProps)(Currency);

Currency.propTypes = {
  // currencys: PropTypes.arrayOf(String).isRequired,
  expensesAction: PropTypes.func.isRequired,
};
