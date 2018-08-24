import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: undefined,
      date: props.dueDate ? moment(props.dueDate) : null,
      focused: undefined,
    };
  }

  handleEditItemReturn = e => {
    e.preventDefault();

    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const id = e.target.itemid.value;
    const date = parseFloat(e.target.itemdate.value);
    const dueDate = moment(this.state.date).valueOf();
    this.props.handleEditItemReturn(item, itemPriority, id, date, dueDate);
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
          <div className="form-additem__duedate">
            <SingleDatePicker
              enableOutsideDay={true}
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="datePicker" // PropTypes.string.isRequired,
              numberOfMonths={1}
              showClearDate={true}
              isOutsideRange={this.isOutsideRange}
            />
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
