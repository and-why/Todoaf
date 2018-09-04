import React, { Component } from 'react';
import AddItem from './AddItem';
import Items from './Items';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    background: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    width: '90%',
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

class ItemsAll extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
    this.openAddModal = this.openAddModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.handleAddItem = this.handleAddItem.bind(this);
  }

  openAddModal() {
    this.setState({ modalIsOpen: true });
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
      <div className="items">
        <Items
          items={this.props.items}
          handleUndoItem={this.props.handleUndoItem}
          handleRemoveItem={this.props.handleRemoveItem}
          handleCompleteItem={this.props.handleCompleteItem}
          handleEditItem={this.props.handleEditItem}
          handleEditItemReturn={this.props.handleEditItemReturn}
        />
        <AddItemButton openAddModal={this.openAddModal} />
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

          <AddItem handleAddItem={this.props.handleAddItem} onRequestClose={this.closeModal} />
        </Modal>
      </div>
    );
  }
}

const AddItemButton = props => (
  <button className="addItemButton btn-add " onClick={props.openAddModal}>
    +
  </button>
);

export default ItemsAll;
