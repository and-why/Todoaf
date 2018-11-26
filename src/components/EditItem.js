import React, { Component } from "react";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import ItemForm from "./ItemForm";

class EditItem extends Component {
  onSubmit = item => {
    // console.log("edit item submit:", item);
    this.props.handleEditItemReturn(item);
  };

  render() {
    return (
      <ItemForm
        item={this.props.item}
        onSubmit={this.onSubmit}
        handleEditItem={this.props.handleEditItem}
        form="edit"
      />
    );
  }
}

export default EditItem;
