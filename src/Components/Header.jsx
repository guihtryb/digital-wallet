import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import headerLogo from '../headerLogo.jpg';

class Header extends Component {
  render() {
    const { user, handleExpenses, email } = this.props;
    return (
      <header className="header-container">
        <span id="user">{ user }</span>
        <img src={ headerLogo } alt="header Logo" />
        <span id="user-email" data-testid="email-field">{`Email: ${email}`}</span>
        <div className="expenses-container">
          <span data-testid="total-field" id="total-field">
            {`Despesa Total: R$ ${handleExpenses()}` }
          </span>
          <span data-testid="header-currency-field" id="currency"> BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  handleExpenses: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};
