import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Wallet.css';
import Currency from '../Components/Currency';
import headerLogo from '../headerLogo.jpg';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      despesas: 0,
      currencys: [],
    };
    this.createLogin = this.createLogin.bind(this);
    this.fetchRequisition = this.fetchRequisition.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { despesas, currencys } = this.state;
    const { email } = this.props;
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
          <div>
            <span data-testid="total-field">{`Despesa Total: R$ ${despesas} `}</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </header>
        <Currency currencys={ currencys } />
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
