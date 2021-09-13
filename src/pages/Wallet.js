import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Wallet.css';
import Currency from '../Components/Currency';
import headerLogo from '../headerLogo.jpg';
import ExpensesTable from '../Components/ExpensesTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: 0,
    };

    this.createLogin = this.createLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { initial } = this.state;
    const { email, despesas } = this.props;
    const toMatch = email.indexOf('@');
    let user;
    if (email) {
      user = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;
    }
    return (
      <div>
        <header className="header-container">
          <span>{ user }</span>
          <img src={ headerLogo } alt="header Logo" />
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <div className="expenses-container">
            <span data-testid="total-field">
              {despesas
                ? `Despesa Total: R$ ${despesas} ` : `Despesa Total: R$ ${initial} ` }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <Currency />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  despesas: state.wallet.despesas,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  despesas: PropTypes.number.isRequired,
};
