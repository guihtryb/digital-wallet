import React from 'react';
import '../Styles/Login.css';
import LoginLogo from '../Login.png';

class Login extends React.Component {
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

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    // this.validForm();
  }

  // lert('Fire in the hole');

  handleSubmit(event) {
    const { email } = this.state;

    const toMatch = email.indexOf('@');
    console.log(toMatch);
    const userName = `_${email[0].toUpperCase()}${email.substr(1, toMatch - 1)}_`;

    alert(`Login Succesful! Your user name is  ${userName}`);
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
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            onKeyUp={ this.validForm }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            onKeyUp={ this.validForm }
          />
          <button type="submit" disabled={ disabled }>Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
