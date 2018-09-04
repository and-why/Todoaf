import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      date: null,
      focused: undefined,
    };
  }
  handleAddItem = e => {
    e.preventDefault();

    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const itemDate = moment(this.state.date).valueOf();
    const notes = e.target.notes.value.trim();
    const error = this.props.handleAddItem(item, itemPriority, itemDate, notes);

    if (!error) {
      e.target.itemText.value = '';
      e.target.itemPriority.value = 2;
    }
    this.props.onRequestClose();
  };
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form className="form-additem" onSubmit={this.handleAddItem}>
          <div className="form__wrapper">
            <div className="form-additem__text">
              <label htmlFor="itemText">Task name:</label>
              <input type="text" name="itemText" placeholder="Insert task here" />
            </div>
            <div className="form-additem__priority">
              <label htmlFor="itemPriority">Priority</label>
              <select name="itemPriority" id="priority" defaultValue="2">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </div>
            <div className="form-additem__duedate">
              <label htmlFor="datePicker">Due Date</label>
              <SingleDatePicker
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                id="datePicker" // PropTypes.string.isRequired,
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>
            <div className="notes">
              <label htmlFor="notes">Notes:</label>
              <textarea name="notes" id="notes" />
            </div>
          </div>
          <button className="btn btn-add form-additem__btn">Add</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
