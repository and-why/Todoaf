import React, { Component } from 'react';
import autosize from 'autosize';

// import { Editor, EditorState } from 'draft-js';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

moment.locale('en-gb');

class ItemForm extends Component {
  constructor(props) {
    super(props);
    // console.log('ItemForm form open', props.item);
    this.state = {
      id: props.item ? props.item.id : '',
      text: props.item ? props.item.text : '',
      priority: props.item ? props.item.priority : '2',
      dueDate: props.item ? props.item.dueDate : null,
      notes: props.item ? props.item.notes : '',
      list: props.item ? props.item.list : 'personal',
      editable: props.item ? props.item.editable : false,
      // editorState: EditorState.createEmpty(),
      error: undefined,
      focused: undefined,
      form: props.form,
    };
  }
  
  componentDidMount() {
    autosize(this.textarea);
    console.log('component did mount edit', this.props.item);
  }
  componentDidUpdate() {
    autosize(this.textarea);
    console.log('component did update edit', this.props.item);
  }
  onItemNameChange = e => {
    const text = e.target.value;
    console.log('ItemForm.js onItemNameChange: ', text);
    this.setState({ text });
  };
  onPirorityChange = e => {
    console.log(e.target.value);
    const priority = e.target.value;
    this.setState({ priority });
  };
  // onNotesChange = editorState => {
  //   console.log(editorState);
  //   this.setState({ editorState });
  // };
  onDateChange = dueDate => {
    if (dueDate) {
      this.setState(() => ({ dueDate }));
    } else {
      this.setState(() => ({ dueDate: null }));
    }
  };
  cancel = e => {
    e.preventDefault();
    this.props.handleEditItem({ ...this.props.item });
  };
  onNotesChange = e => {
    const notes = e.target.value;
    this.setState({ notes });
    e.target.style.height = e.target.scrollHeight + 'px';
  };
  onListChangePersonal = e => {
    this.setState({list: 'personal'})
  }
  onListChangeWork = e => {
    this.setState({list: 'work'})
  }
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.text === '') {
      this.setState(() => ({
        error: 'Please provide an item title.',
      }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        ...this.state,
        dueDate: this.state.dueDate !== null ? this.state.dueDate.valueOf() : null,
      });
    }
  };
  render() {
    return (
      <form className={`form-${this.state.form}item`} onSubmit={this.onSubmit}>
        <div className="form__wrapper">
          <div className="form-additem__text">
            <label htmlFor="itemText">Task title:</label>
            <input
              autoFocus="true"
              type="text"
              name="title"
              placeholder="Insert task here"
              value={this.state.text}
              onChange={this.onItemNameChange}
            />
            {this.state.error && <p className="error-message">{this.state.error}</p>}
          </div>
          <div className="form-additem__priority">
            <label htmlFor="itemPriority">Priority:</label>
            <select
              name="itemPriority"
              id="priority"
              defaultValue={this.state.priority ? this.state.priority : '2'}
              onChange={this.onPirorityChange}
            >
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="form-additem__duedate">
            <label htmlFor="datePicker">Due Date:</label>
            <SingleDatePicker
              date={this.state.dueDate !== null ? moment(this.state.dueDate) : null} // momentPropTypes.momentObj or null
              onDateChange={this.onDateChange} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="datePicker" // PropTypes.string.isRequired,
              numberOfMonths={1}
              isOutsideRange={() => false}
              displayFormat="DD MMM YYYY"
            />
          </div>
          <div className="notes">
            <label htmlFor="notes">Notes:</label>
            {/*<Editor editorState={this.state.editorState} onChange={this.onNotesChange} />*/}
            <textarea
              ref={c => (this.textarea = c)}
              name="notes"
              id="notes"
              onChange={this.onNotesChange}
              value={this.state.notes}
              placeholder="Add notes..."
            />
          </div>
          <div className="list flex-start">
            <label htmlFor="list">List:</label>
            Personal{' '}
            <input
              type="radio"
              name="list"
              id="list"
              onChange={this.onListChangePersonal}
              defaultChecked={this.state.list === 'personal'}
            />
            Work{' '}
            <input
              type="radio"
              name="list"
              id="list"
              onChange={this.onListChangeWork}
              defaultChecked={this.state.list === 'work'}
            />
          </div>
        </div>
        {this.state.form === 'add' ? (
          <button className="btn btn-add form-additem__btn">Add</button>
        ) : (
          <div className="flex">
            <button className="btn btn-add form-additem__btn mr1">Save</button>
            <button onClick={this.cancel} className="btn btn-cancel form-additem__btn">
              Cancel
            </button>
          </div>
        )}
      </form>
    );
  }
}

export default ItemForm;
