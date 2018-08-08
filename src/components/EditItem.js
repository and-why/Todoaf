import React, { Component } from 'react';

class EditItem extends Component {
  state = { 
    error:undefined
  };

  handleEditItemReturn = e => {
    e.preventDefault();

    console.log(e.target.itemid)
    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const id = e.target.key; 
    const error = this.props.handleEditItemReturn(item, itemPriority, id);

    if (!error) {
      e.target.itemText.value = '';
      e.target.itemPriority.value = 2;
    } 
  }
    render() {
      return (
        <div>
          {console.log('ITEM:', this.id)}
          <form className="form-edititem" onSubmit={this.handleEditItemReturn} >
            <div className="form-edititem__text">
              <label htmlFor="itemText">Task name:</label>
              <input type="text" name="itemText" placeholder="Insert task here" value={this.props.text} />
            </div>
            <div className="form-edititem__priority">
              <label htmlFor="itemPriority">Priority</label>
              <select name="itemPriority" id="priority" >
                <option value="1">High</option>
                <option value="2" defaultValue>Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
            <div className="formedit_id">
              <input type="text" name="itemid" value={this.props.id} />
            </div>
            <button className="btn btn-success form-additem__btn">Edit</button>
          </form>
        </div>
      )
    }
  }

  export default EditItem;