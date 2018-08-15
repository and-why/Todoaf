import React, { Component } from 'react';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.onRequestClose();
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <button onClick={this.props.onRequestClose}>Exit</button>
        <form onSubmit={this.onSubmit}>
          <input
            value={email}
            type="text"
            onChange={e => this.setState(byPropKey('email', e.target.value))}
            placeholder="Email Address"
          />
          <input
            value={password}
            type="password"
            onChange={e => this.setState(byPropKey('password', e.target.value))}
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Log In
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInButton = props => (
  <button className="auth__button" onClick={props.openModalSignIn}>
    Log In
  </button>
);

export { SignInButton, SignInForm };
