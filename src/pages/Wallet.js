import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import headerLogo from '../headerLogo.jpg';
import '../Styles/Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      despesas: 0,
    };
    this.createLogin = this.createLogin.bind(this);
  }

  createLogin() {
    const { email } = this.props;
    const toMatch = email.indexOf('@');
    const user = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;

    return user;
  }

  render() {
    const { despesas } = this.state;
    const { email } = this.props;

    return (
      <div>
        <header className="header-container">
          {email ? <span id="user-name">{this.createLogin()}</span> : null}
          <img src={ headerLogo } alt="header logo" />
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <div className="currency-container">
            <span data-testid="total-field">{`Despesa Total: R$ ${despesas} `}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
