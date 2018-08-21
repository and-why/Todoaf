import React, { Component } from 'react';
import logo from '../images/logo.svg';
import Modal from 'react-modal';
import moment from 'moment';


import SignOutButton from './SignOutButton';
import { SignInForm, SignInButton } from './SignInForm';
import { SignUpForm, SignUpButton } from './SignUpForm';

const customStyles = {
  overlay: {
    background: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 0,
    borderRadius: '5px',
    padding: '0',
    background: '#333',
    boxShadow: '0 0 15px 4px rgba(0,0,0,.3)',
  },
};

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      signUp: false,
      signIn: false,
    };
    this.openModalSignUp = this.openModalSignUp.bind(this);
    this.openModalSignIn = this.openModalSignIn.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModalSignIn() {
    this.setState({ modalIsOpen: true, signIn: true, signUp: false });
  }
  openModalSignUp() {
    this.setState({ modalIsOpen: true, signIn: false, signUp: true });
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <header className="app-header">
        {this.props.authUser ? (
          <SignOutButton openModal={this.openModal} />
        ) : (
          <div className="auth">
            <SignInButton openModalSignIn={this.openModalSignIn} />
            <SignUpButton openModalSignUp={this.openModalSignUp} />
          </div>
        )}

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button onClick={this.closeModal} className="modal__button-exit">
            x
          </button>
          {this.state.signUp ? (
            <SignUpForm onRequestClose={this.closeModal} />
          ) : (
            <SignInForm onRequestClose={this.closeModal} />
          )}
        </Modal>
        <div className="app-header__brandwrapper">
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className="app-header__title">{this.props.title}</h1>
        </div>
        <p className="app-header__subtitle">{this.props.subtitle}</p>
        <p className="app-header__date">{moment().format('dddd MMMM Do YYYY')}</p>
      </header>
    );
  }
}

export default Header;
