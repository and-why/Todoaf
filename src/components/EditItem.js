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

  autoSize = e => {
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  cancel = e => {
    e.preventDefault();
    this.props.handleEditItem({ ...this.props });
  };
  handleEditItemReturn = e => {
    e.preventDefault();

    const item = e.target.itemText.value.trim();
    const itemPriority = parseInt(e.target.itemPriority.value, 10);
    const id = e.target.itemid.value;
    const date = parseFloat(e.target.itemdate.value);
    const dueDate = moment(this.state.date).valueOf();
    const notes = e.target.notes.value.trim();
    this.props.handleEditItemReturn(item, itemPriority, id, date, dueDate, notes);
  };
  render() {
    return (
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
            date={this.state.date} // momentPropTypes.momentObj or null
            onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
            focused={this.state.focused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
            id="datePicker" // PropTypes.string.isRequired,
            numberOfMonths={1}
            showClearDate={true}
            isOutsideRange={() => false}
          />
        </div>
        <div className="notes">
          <textarea
            name="notes"
            id="notes"
            rows="auto"
            placeholder="Add notes"
            height={this.scrollHeight}
            onChange={this.autoSize}
            defaultValue={this.props.notes}
          />
        </div>
        <div className="formedit_id">
          <input type="text" name="itemid" defaultValue={this.props.id} />
          <input type="text" name="itemdate" defaultValue={this.props.createDate} />
        </div>
        <div className="flex">
          <button className="btn btn-add form-additem__btn mr1">Save</button>
          <button onClick={this.cancel} className="btn btn-cancel form-additem__btn">
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default EditItem;
