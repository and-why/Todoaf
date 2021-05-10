import React from 'react';

const LoadingPage = () => (
  <div className='loading-page'>
    <div className='loader'>
      <img className='app-logo sway' src='/images/logo.svg' alt='todoAF Logo' />
      <h1 className='loader__copy'>Loading...</h1>
    </div>
  </div>
);

export default LoadingPage;
