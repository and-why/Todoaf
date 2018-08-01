import React, { Component } from 'react';

class AddItem extends Component {
state = {
  error: undefined
};
  handleAddItem = (e) => {
    e.preventDefault();
    
    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value);

    const error = this.props.handleAddItem(item, itemPriority);

    if(!error) {
      e.target.itemText.value = '';
      e.target.itemPriority.value = 1;
    }
  };
render() {
  return(
    <div>
      {this.state.error && <p>{this.state.error}</p>}
      <form className="form-additem" onSubmit={this.handleAddItem}>
        <div className="form-additem__text">
          <label htmlFor="itemText">Task name:</label>
          <input type="text" name="itemText" placeholder="SEO Audit"/>
        </div>
        <div className="form-additem__priority">
          <label htmlFor="itemPriority">Priority</label>
          <select name="itemPriority" id="priority">
            <option value="1">1 - low</option>
            <option value="2">2</option>
            <option value="3">3 - high</option>
          </select>
        </div>
        <button className="btn btn-success form-additem__btn">
          Add Item
        </button>
      </form>
    </div>
  ) 
}

}

export default AddItem;