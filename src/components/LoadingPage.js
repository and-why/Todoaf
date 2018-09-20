import React from 'react';
import logo from '../images/logo.svg';

const LoadingPage = () => (
  <div className="loading-page">
    <div className="loader">
      <img src={logo} className="app-logo-loading" alt="logo" />
      <h1 className="loader__copy">Loading...</h1>
    </div>
  </div>
);

export default LoadingPage;
