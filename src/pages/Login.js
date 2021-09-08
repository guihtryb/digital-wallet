import React, { Component } from 'react';
import '../Styles/Login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserLogin } from '../actions/index';
import LoginLogo from '../Login.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validForm = this.validForm.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  validForm() {
    const { password, email } = this.state;
    const passwordLength = 6;

    const errorCases = [
      password.length < passwordLength,
      !email.includes('@'),
      email.split('@').length > 2,
      !email.includes('.com'),
    ];

    const filledCorrect = errorCases.every((error) => error === false);

    if (filledCorrect) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  sendLogin() {
    const { email } = this.state;

    const { history, UserLoginAction } = this.props;

    // const toMatch = email.indexOf('@');
    // const user = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;

    UserLoginAction(email);

    history.push('/carteira');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="login-container">
        <img src={ LoginLogo } alt="Login logo" className="login-logo" />
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="email-input"
            className="login-input"
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            onKeyUp={ this.validForm }
            placeholder="Email"
          />
          <input
            data-testid="password-input"
            className="login-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            onKeyUp={ this.validForm }
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={ disabled }
            onClick={ this.sendLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  UserLoginAction: (email) => dispatch(UserLogin(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  UserLoginAction: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};
