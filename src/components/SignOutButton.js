import React from 'react';

import { auth } from '../firebase';

const SignOutButton = () => (
  <div className="auth">
    <button type="button" className="auth__button" onClick={auth.doSignOut}>
      Log Out
    </button>
  </div>
);

export default SignOutButton;
