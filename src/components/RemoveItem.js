import React, { Component } from 'react';

class RemoveItem extends Component {
  state = {
    error: undefined
  }
  handleRemoveItem = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div>
        <button className="Item_remove" onClick={(e) => {this.handleRemoveItem(e.id)}}>Delete</button>
      </div>
    )
  }

}

export default RemoveItem;

