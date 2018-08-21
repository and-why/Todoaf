import React, { Component } from 'react';

class EditItem extends Component {
  state = {
    value: '',
    error: undefined,
  };


  handleEditItemReturn = e => {
    e.preventDefault();
    console.log('click')
    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const id = e.target.itemid.value;
    const date = parseFloat(e.target.itemdate.value);
    this.props.handleEditItemReturn(item, itemPriority, id, date);
  };
  render() {
    return (
      <div>
        <form className="form-edititem" onSubmit={this.handleEditItemReturn}>
          <div className="form-edititem__text">
            <input
              type="text"
              name="itemText"
              placeholder="Insert task here"
              defaultValue={this.props.text}
            />
          </div>
          <div className="form-edititem__priority">
            <select name="itemPriority" id="priorityEdit" defaultValue={this.props.priority}>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="formedit_id">
            <input type="text" name="itemid" defaultValue={this.props.id} />
            <input type="text" name="itemdate" defaultValue={this.props.createDate} />
          </div>
          <button className="btn btn-add form-additem__btn">Save</button>
        </form>
      </div>
    );
  }
}

export default EditItem;
