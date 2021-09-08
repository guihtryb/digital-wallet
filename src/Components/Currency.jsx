import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { walletExpenses } from '../actions/index';

class Currency extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      des: '',
      currency: '',
      paymentT: '',
      paymantS: '',
      id: 0,
    };
    this.chang = this.chang.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  addExpense() {
    const { expensesAction } = this.props;
    const { id } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }));
    expensesAction(this.state, id);
  }

  render() {
    const { value, des, currency, paymentT, paymantS } = this.state;
    const { currencys } = this.props;
    const { chang, addExpense, handleSubmit } = this;
    return (
      <div>
        <form className="wallet-container" onSubmit={ handleSubmit }>
          <label htmlFor="v">
            Valor
            <input type="number" name="value" id="v" onChange={ chang } value={ value } />
          </label>
          <label htmlFor="d">
            Descrição
            <input type="text" name="des" id="d" onChange={ this.chang } value={ des } />
          </label>
          <label htmlFor="c">
            Moeda
            <select name="currency" id="c" onChange={ this.chang } value={ currency }>
              {currencys.map(({ code, name }) => (
                <option key={ name }>
                  { code }
                </option>))}
            </select>
          </label>
          <label htmlFor="pt">
            Método de pagamento
            <select name="paymentT" id="pt" onChange={ this.chang } value={ paymentT }>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Credito">Cartão de crédito</option>
              <option value="Debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="ps">
            Tag
            <select name="paymantS" id="ps" onChange={ this.chang } value={ paymantS }>
              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Trasporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button className="add-button" type="submit" onClick={ addExpense }>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  expensesAction: (expenses) => dispatch(walletExpenses(expenses)),
});

export default connect(null, mapDispatchToProps)(Currency);

Currency.propTypes = {
  currencys: PropTypes.arrayOf(String).isRequired,
  expensesAction: PropTypes.func.isRequired,
};
