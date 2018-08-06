import React from 'react';
import logo from '../images/logo.svg';

const Header = props => (
  <header className="app-header">
    <div className="help">
      <p>TIPS</p>
      <div className="help__box">
        <ul>
          <li>Double-click an item to change its priority</li>
        </ul>
      </div>
    </div>
    <img src={logo} className="app-logo" alt="logo" />
    <h1 className="app-header__title">{props.title}</h1>
    {props.subtitle && <h3 className="app-header__subtitle">{props.subtitle}</h3>}
  </header>
);

export default Header;
