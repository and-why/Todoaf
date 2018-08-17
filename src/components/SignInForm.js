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
        <form onSubmit={this.onSubmit}>
          <div className="modal__form--inputs">
            <h2>Sign In To Your Account</h2>
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
          </div>
          {error && <p>{error.message}</p>}
          <button disabled={isInvalid} type="submit" className="btn modal__button--accept">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

const SignInButton = props => (
  <button className="auth__button auth__button--login" onClick={props.openModalSignIn}>
    Log In
  </button>
);

export { SignInButton, SignInForm };
