import React, { Component } from 'react';

import {auth} from '../firebase';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  erro: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

onSubmit = (e) => {
  e.preventDefault()
}


  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
   
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={e => this.setState(byPropKey('username', e.target.value))}
          type="text"
          placeholder="Name"
        />
      </div>
    )
  }
}
