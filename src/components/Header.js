import React from 'react';
import logo from '../images/logo.svg';

import { SignUpButton, SignUpForm } from './SignUpForm';

const Header = props => (
  <header className="app-header">
    <SignUpButton />

    <img src={logo} className="app-logo" alt="logo" />
    <h1 className="app-header__title">{props.title}</h1>
    {props.subtitle && <h3 className="app-header__subtitle">{props.subtitle}</h3>}
  </header>
);

export default Header;
