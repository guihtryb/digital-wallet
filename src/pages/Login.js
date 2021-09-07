import React from 'react';
import '../Styles/Login.css';
import LoginLogo from '../Login.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <img src={ LoginLogo } alt="Login logo" className="login-logo" />
        <form>
          <input
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            data-testid="password-input"
            type="text"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
