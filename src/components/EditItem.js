import React, { Component } from 'react';

class EditItem extends Component {
  state = {
    value: '',
    error: undefined,
  };

  handleItemTextEdit = e => {
    let itemText = e.target.itemText;
  };
  handleEditItemReturn = e => {
    e.preventDefault();

    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const id = parseFloat(e.target.itemid.value);
    const error = this.props.handleEditItemReturn(item, itemPriority, id);
  };
  render() {
    return (
      <div>
        <form className="form-edititem" onSubmit={this.handleEditItemReturn}>
          <div className="form-edititem__text">
            <label htmlFor="itemText">Task name:</label>
            <input
              type="text"
              name="itemText"
              placeholder="Insert task here"
              defaultValue={this.props.text}
              onChange={this.handleItemTextEdit}
            />
          </div>
          <div className="form-edititem__priority">
            <label htmlFor="itemPriority">Priority</label>
            <select name="itemPriority" id="priority" defaultValue={this.props.priority}>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="formedit_id">
            <input type="text" name="itemid" defaultValue={this.props.id} />
          </div>
          <button className="btn btn-success form-additem__btn">Save</button>
        </form>
      </div>
    );
  }
}

export default EditItem;
