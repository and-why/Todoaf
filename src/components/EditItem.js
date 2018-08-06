import React, { Component } from 'react';

class EditItem extends Component {
  state = { 
    error:undefined;
  };

  handleEditItemReturn = e => {
    e.preventDefault();

    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const error = this.props.handleAddItem(item, itemPriority);
  }
    render() {
      return (
        <div>
          <form className="form-additem" onSubmit={this.handleAddItem}>
          <div className="form-additem__text">
            <label htmlFor="itemText">Task name:</label>
            <input type="text" name="itemText" placeholder="Insert task here" />
          </div>
          <div className="form-additem__priority">
            <label htmlFor="itemPriority">Priority</label>
            <select name="itemPriority" id="priority">
              <option value="1">High</option>
              <option value="2" defaultValue>Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <button className="btn btn-success form-additem__btn">Edit</button>
        </form>
        </div>
      )
    }
  }


}