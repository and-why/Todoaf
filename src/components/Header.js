import React, { Component } from "react";
import logo from "../images/logo.svg";

import Modal from "react-modal";
import moment from "moment";

import SignOutButton from "./SignOutButton";
import { SignInForm, SignInButton } from "./SignInForm";
import { SignUpForm, SignUpButton } from "./SignUpForm";

const customStyles = {
  overlay: {
    background: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    width: "50%",
    minWidth: "290px",
    maxWidth: "500px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    borderRadius: "5px",
    padding: "0",
    background: "#333",
    boxShadow: "0 0 15px 4px rgba(0,0,0,.3)"
  }
};

const ampm = new Date().getHours();

class Header extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      signUp: false,
      signIn: false
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
  stopSway() {
    document.querySelector(".app-logo").classList.toggle("sway");
  }

  render() {
    return (
      <header className="app-header Container">
        <div className="app-header__brandwrapper">
          <button
            className={`btn app-header__light-icon ${this.props.light &&
              "light"}`}
            onClick={this.props.handleNightMode}
          >
            <svg viewBox="0 0 352 512">
              <path
                fill="currentColor"
                d="M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z"
              />
            </svg>
          </button>

          <div className="app-header__logo-wrap">
            <svg
              onClick={this.stopSway}
              class="app-logo sway"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <defs />
              <title>logo</title>
              <path
                class="cls-1"
                d="M142.14,126.43a52.57,52.57,0,0,1-105.14,0"
              />
              <line class="cls-2" x1="37" y1="70.38" x2="37" y2="127.73" />
              <line class="cls-2" x1="65.92" y1="52.47" x2="65.92" y2="88.84" />
              <line class="cls-2" x1="94.84" y1="11" x2="94.84" y2="76" />
              <line
                class="cls-2"
                x1="123.77"
                y1="45.66"
                x2="123.77"
                y2="82.02"
              />
              <path
                class="cls-2"
                d="M163,97.45c-19.12,0-20.86,17.55-20.86,30.41"
              />
            </svg>
            <h1 className="app-header__title">{this.props.title}</h1>
          </div>

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
        </div>
        <p className="app-header__subtitle">{this.props.subtitle}</p>
        <p className="app-header__date">
          Good {+ampm < 12 ? "morning" : ampm < 18 ? "afternoon" : "evening"},
          today is
          <br />
          {moment().format("dddd MMMM Do YYYY")}
        </p>
        <p className="app-heder__completed-tally">
          Completed Tasks:{" "}
          {this.props.items.filter(item => item.completed).length} /{" "}
          {this.props.items.length}
        </p>
      </header>
    );
  }
}

export default Header;
