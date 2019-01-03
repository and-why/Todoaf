import React, { Component } from "react";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import ItemForm from "./ItemForm";

class AddItem extends Component {
  onSubmit = item => {
    console.log("item:", item);
    this.props.handleAddItem(item);
    this.props.onRequestClose();
  };

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
