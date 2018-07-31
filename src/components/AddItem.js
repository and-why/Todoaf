import React, { Component } from 'react';

class AddItem extends Component {
state = {
  error: undefined
};
  handleAddItem = (e) => {
    e.preventDefault();
    
    const item = e.target.item.value.trim()
    const error = this.props.handleAddItem(item);

    if(!error) {
      e.target.item.value = '';
    }
  };
render() {
  return(
    <div>
      {this.state.error && <p>{this.state.error}</p>}
      <form className="AddItem" onSubmit={this.handleAddItem}>
        <input type="text" className="ItemToAdd" name="item" placeholder="Bench Press"/>
        <select name="priority" id="priority">
          <option value="1">1</option>
        </select>
        <button className="btn btn-success">
          Add Item
        </button>
      </form>
    </div>
  ) 
}

}

export default AddItem;