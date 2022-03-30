import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Wallet.css';
import Header from '../Components/Header';
import ExpensesTable from '../Components/ExpensesTable';
import ExpensesBoard from '../Components/ExpensesBoard';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.createLogin = this.createLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExpenses = this.handleExpenses.bind(this);
  }

  createLogin() {
    const { email } = this.props;
    const toMatch = email.indexOf('@');
    return `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleExpenses() {
    const { expenses } = this.props;
    const precision = 100;

    const expensesArray = expenses.map(({ exchangeRates,
      currency, value }) => {
      const currencies = Object.values(exchangeRates);
      const correctCurrency = currencies.filter((curr) => curr.code === currency);
      const calc = Number(value) * correctCurrency[0].ask;
      return parseInt(calc * precision, 10) / precision;
    });

    if (expenses.length) {
      return parseInt(expensesArray
        .reduce((a, b) => a + b) * precision, 10) / precision;
    }
    return 0;
  }

  render() {
    this.handleExpenses();
    const email = localStorage.getItem('email');
    const toMatch = email.indexOf('@');
    let user;
    if (email) {
      user = `_${email[0].toUpperCase()}${email.substring(1, toMatch - 1)}_`;
    }
    return (
      <div className="wallet-style">
        <Header user={ user } email={ email } handleExpenses={ this.handleExpenses } />
        <ExpensesBoard />
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};
