import React from 'react';
import logo from '../images/logo.svg';

const Header = props => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="header__title">{props.title}</h1>
    {props.subtitle && <h3 className="header__subtitle">{props.subtitle}</h3>}
  </header>
);

export default Header;
