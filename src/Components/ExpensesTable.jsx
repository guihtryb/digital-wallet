import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/ExpensesTable.css';

class ExpensesTable extends Component {
  constructor() {
    super();
    this.renderExpensesInfos = this.renderExpensesInfos.bind(this);
  }

  renderExpensesInfos(expenses, deleteExpenses, ...index) {
    const infos = expenses[index];
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
    if (infos) {
      const correctlyCurrency = Object.values(infos.exchangeRates)
        .filter((rate) => rate.code === infos.currency);
      const expense = Number(infos.value) * correctlyCurrency[0].ask;
      const precision = 100;
      const correctExpense = parseInt(expense * precision, 10) / precision;
      const cambio = Object.values(infos.exchangeRates)
        .filter((exc) => exc.code === infos.currency)[0].ask;
      const tableInfos = [
        <td key={ 0 }>{infos.description}</td>,
        <td key={ 1 }>{infos.tag }</td>,
        <td key={ 2 }>{infos.method }</td>,
        <td key={ 3 }>{`${parseInt(infos.value, 10)}`}</td>,
        <td key={ 4 }>{changes[infos.currency]}</td>,
        <td key={ 5 }>{parseFloat(cambio).toFixed(2)}</td>,
        <td id="value" key={ 6 }>{correctExpense}</td>,
        <td key={ 7 }>Real</td>,
        <td key={ 8 }>
          <button
            name={ index }
            type="button"
            data-testid="delete-btn"
            className="delete-button"
            onClick={ deleteExpenses }
          >
            Delete
          </button>
        </td>,
      ];
      return tableInfos;
    }
  }

  render() {
    const { expenses, deleteExpenses, id } = this.props;

    return (
      <tr>
        { this.renderExpensesInfos(expenses, deleteExpenses, id) }
      </tr>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.despesas,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  id: PropTypes.number.isRequired,
  expenses: PropTypes.objectOf(String).isRequired,
  deleteExpenses: PropTypes.func.isRequired,
};
