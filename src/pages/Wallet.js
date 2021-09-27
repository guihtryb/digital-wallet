import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Wallet.css';
import Currency from '../Components/Currency';
import headerLogo from '../headerLogo.jpg';

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
    const user = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;
    return user;
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
      const correctExpense = parseInt(calc * precision, 10) / precision;
      return correctExpense;
    });
    if (expenses.length) {
      const totalExpenses = parseInt(expensesArray
        .reduce((a, b) => a + b) * precision, 10) / precision;
      return totalExpenses;
    }
    return 0;
  }

  render() {
    this.handleExpenses();
    const { email } = this.props;
    const toMatch = email.indexOf('@');
    let user;
    if (email) {
      user = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;
    }
    return (
      <div className="wallet-style">
        <header className="header-container">
          <span id="user">{ user }</span>
          <img src={ headerLogo } alt="header Logo" />
          <span id="user-email" data-testid="email-field">{`Email: ${email}`}</span>
          <div className="expenses-container">
            <span data-testid="total-field" id="total-field">
              {`Despesa Total: R$ ${this.handleExpenses()}` }
            </span>
            <span data-testid="header-currency-field" id="currency"> BRL</span>
          </div>
        </header>
        <Currency />
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
