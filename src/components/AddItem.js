import React, { Component } from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// import NotesEditor from './NotesEditor';

import ItemForm from './ItemForm';

class AddItem extends Component {
  onSubmit = item => {
    console.log('item:', item);
    this.props.handleAddItem(item);
    this.props.onRequestClose();
  };

  // handleAddItem = e => {
  //   e.preventDefault();

  //   console.log('editor', this.state.editorState);

  //   const item = e.target.itemText.value.trim();
  //   const itemPriority = parseInt(e.target.itemPriority.value, 10);
  //   const itemDate = moment(this.state.date).valueOf();
  //   const notes = this.state.editorState;
  //   const list = e.target.list.value;

  //   console.log(list);

  //   const error = this.props.handleAddItem(item, itemPriority, itemDate, notes, list);
  //   if (!error) {
  //     e.target.itemText.value = '';
  //     e.target.itemPriority.value = 2;
  //   }
  //   this.props.onRequestClose();
  // };
  render() {
    return (
      <div>
        {this.props.error && <p>{this.props.error}</p>}
        <ItemForm onSubmit={this.onSubmit} form="add" />
      </div>
    );
  }
}

export default AddItem;
