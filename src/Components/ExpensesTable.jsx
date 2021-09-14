import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/ExpensesTable.css';

class ExpensesTable extends Component {
  render() {
    const { deleteExpenses } = this.props;
    const { expense: { exchangeRates,
      currency, description, tag, method, value } } = this.props;
    const changes = {
      USD: 'Dólar Comercial',
      CAD: 'Dólar Canadense',
      EUR: 'Euro',
      GBP: 'Libra Esterlina',
      ARS: 'Peso',
      BTC: 'Bitcoin',
      LTC: 'Litecoin',
      JPY: 'Yen',
      CHF: 'Swiss',
      AUD: 'Dólar Australiano',
      CNY: 'Yuan',
      ILS: 'Israeli New Shekew',
      ETH: 'Ethereum',
      XRP: 'Riple',
    };
    const currencies = Object.values(exchangeRates);
    const correctCurrency = currencies.filter((curr) => curr.code === currency);
    const calc = Number(value) * correctCurrency[0].ask;
    const precision = 100;
    const correctExpense = parseInt(calc * precision, 10) / precision;
    const cambio = currencies.filter((exc) => exc.code === currency)[0].ask;

    return (
      <tr>
        <td>{description}</td>
        <td>{tag }</td>
        <td>{method }</td>
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
            onClick={ deleteExpenses }
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default connect(null)(ExpensesTable);

ExpensesTable.propTypes = {
  deleteExpenses: PropTypes.func.isRequired,
  expense: PropTypes.objectOf(String).isRequired,
};
