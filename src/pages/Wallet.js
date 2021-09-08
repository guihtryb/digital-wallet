import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      despesas: 0,
      currencys: [],
    };
    this.createLogin = this.createLogin.bind(this);
    this.fetchRequisition = this.fetchRequisition.bind(this);
  }

  componentDidMount() {
    this.fetchRequisition();
  }

  createLogin() {
    const { email } = this.props;
    const toMatch = email.indexOf('@');
    const user = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;

    return user;
  }

  async fetchRequisition() {
    const awesomeApi = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(awesomeApi);
    const data = await response.json();
    const coins = Object.values(data);
    const getCoins = coins.filter((coin) => coin.codein !== 'BRLT');
    this.setState({
      currencys: getCoins,
    });
  }

  render() {
    const { despesas, currencys } = this.state;
    const { email } = this.props;
    return (
      <div>
        <header className="header-container">
          <span data-testid="email-field">{`Email: ${email}`}</span>
          <span data-testid="total-field">{`Despesa Total: R$ ${despesas} `}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form className="wallet-container">
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
              {currencys.map(({ code, name }) => (
                <option key={ name }>
                  { code }
                </option>))}
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
              <option value="Alimentacao">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Trasporte">Transporte</option>
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
