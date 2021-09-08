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
          <span data-testid="total-field">{`Despesa Total: R$ ${despesas} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor
            <input type="number" id="value-input" name="value" />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input type="text" id="description-input" name="description" />
          </label>
          <label htmlFor="currency-select">
            Moeda
            <select id="currency-select" name="currency">
              {' '}
            </select>
          </label>
          <label htmlFor="payment-select">
            Método de pagamento
            <select id="payment-select" name="payment-select">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Credito">Cartão de crédito</option>
              <option value="Debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-select">
            Tag
            <select id="tag-select" name="payment-select">
              <option value="Alimentacao">Alimentacao</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Trasporte">Trasporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
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
