import React, { Component } from 'react';
import EditItem from './EditItem';
import moment from 'moment';
import Modal from 'react-modal';
import { convertFromRaw } from 'draft-js';
import  { stateToHTML } from 'draft-js-export-html';

const customStyles = {
  overlay: {
    background: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    width: '90%',
    maxWidth: '320px',
    overflow: 'display',
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)',
    border: 0,
    borderRadius: '5px',
    padding: '0',
    background: '#333',
    boxShadow: '0 0 15px 4px rgba(0,0,0,.3)',
  },
};

const handleExpand = e => {
  e.stopPropagation();
  e.preventDefault();
  let element = e.target.id;
  console.log(element);

  if (!element) {
  } else {
    document.querySelector(`.${element}`).classList.toggle('hidden');
    document.querySelector(`.arrow-${element}`).classList.toggle('rotate');
  }
};

class Item extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
    this.openRemoveModal = this.openRemoveModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openRemoveModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  afterOpenModal() {
    //reference are now sync'd and can be assessed
  }

  render() {
    let notes = '';
    if(this.props.notesAdv) {
      const convertedState = convertFromRaw(JSON.parse(this.props.notesAdv))
      notes = this.props.notesAdv ? stateToHTML(convertedState) : this.props.notes;
    } 
    
    return (
      <div
        className={`item__wrapper item__priority--${this.props.priority} ${this.props.id} hidden`}
      >
        {!this.props.editable && (
          <div className={`item__topline`} onClick={handleExpand} id={this.props.id}>
            {!this.props.editable &&
              (this.props.handleCompleteItem && (
                <button
                  className="btn btn-circle btn-green item__complete"
                  onClick={e => {
                    this.props.handleCompleteItem(this.props);
                  }}
                >
                  <svg viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                    />
                  </svg>
                </button>
              ))}
            <div className="item__name">{this.props.text}</div>
            {this.props.editable && this.props.dueDate ? (
              <div />
            ) : (
              this.props.dueDate && (
                <div
                  className={`item__due-date ${
                    this.props.dueDate < this.props.date ? 'overdue' : 'due'
                  }`}
                >
                  Due: {moment(this.props.dueDate).format('Do MMM YYYY')}
                </div>
              )
            )}

            <svg className={`item__downarrow arrow-${this.props.id}`} viewBox="0 0 320 512">
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              />
            </svg>
          </div>
        )}
        <div className="item__bottomline">
          {this.props.editable && (
            <EditItem
              item={this.props}
              handleEditItemReturn={this.props.handleEditItemReturn}
              handleEditItem={this.props.handleEditItem}
            />
          )}

          {!this.props.editable && (
            <div className="notes">
              <div className="notes__content" dangerouslySetInnerHTML={{__html: notes}} />
            </div>
          )}
          <div className="button__wrapper">
            {this.props.handleUndoItem && (
              <button
                className="btn btn-blue btn-circle item__undo"
                onClick={e => {
                  this.props.handleUndoItem(this.props);
                }}
              >
                <svg viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"
                  />
                </svg>
              </button>
            )}

            {!this.props.editable &&
              (this.props.handleEditItem && (
                <button
                  className="btn btn-circle btn-blue item__complete"
                  onClick={e => {
                    this.props.handleEditItem(this.props);
                  }}
                >
                  <svg viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
                    />
                  </svg>
                </button>
              ))}

            

            {!this.props.editable && (
              <button
                className="btn btn-circle btn-red item__remove"
                onClick={this.openRemoveModal}
              >
                <svg viewBox="0 0 352 512">
                  <path
                    fill="currentColor"
                    d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                  />
                </svg>
              </button>
            )}
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div className="modal__form--inputs ">
                <h2>Are you sure you want to delete this task?</h2>
              </div>
              <div className="flex modal__form--remove-confirm">
                <button
                  className="btn modal__button--accept"
                  onClick={e => {
                    this.props.handleRemoveItem(this.props);
                  }}
                >
                  Yes
                </button>
                <button className="btn modal__button--cancel" onClick={this.closeModal}>
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
