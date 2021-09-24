import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletExpenses } from '../actions/index';
import AddExpenseButton from './AddExpenseButton';
import ExpensesTable from './ExpensesTable';
import '../Styles/ExpensesTable.css';

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
    this.chang = this.chang.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exchangeRatesRequisition = this.exchangeRatesRequisition.bind(this);
    this.renderAddExpenses = this.renderAddExpenses.bind(this);
    this.renderExpenseHeader = this.renderExpenseHeader.bind(this);
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

  renderAddExpenses() {
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

  renderExpenseHeader() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        {this.renderAddExpenses()}
        <table className="expenses-table">
          { this.renderExpenseHeader() }
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
