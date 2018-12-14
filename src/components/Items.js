import React, { Component } from "react";
import Item from "./Item";
import Search from "./Search";

const cmp = function(a, b) {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};

const cmpn = function(a, b) {
  if (a === null) {
    return 1;
  } else if (b === null) {
    return -1;
  } else if (a === b) {
    return 0;
  } else if (a > b) {
    return +1;
  } else if (a < b) {
    return -1;
  }
};

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let date = new Date();
let dayLimit = 1;

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredItems: [],
      search: "",
      completedNumber: 10,
      listFilter: "entire"
    };
  }

  handleSearchItem = e => {
    this.setState({
      search: e
    });
    // console.log(e, this.props.items)
    let filteredItems = this.props.items.filter(
      item => item.text && item.text.toLowerCase().includes(e)
    );

    this.setState({
      filteredItems: filteredItems
    });
  };

  handleShowMore = () => {
    this.setState({
      completedNumber:
        this.state.completedNumber >= this.props.items.length
          ? this.props.items.length
          : this.state.completedNumber + 10
    });
  };
  handleListChange = e => {
    // console.log(this.state.listFilter);
    const value = e.target.value;
    this.setState({
      listFilter: value
    });
  };

  render() {
    return (
      <div>
        {(this.props.items.find(item => item.list === "work") ||
          this.state.listFilter === "work") && (
          <div className="btn__showlist-wrapper">
            <button
              className={`btn btn__showlists ${this.state.listFilter ===
                "entire" && "active"}`}
              onClick={this.handleListChange}
              value="entire"
            >
              Entire List
            </button>
            <button
              className={`btn btn__showlists ${this.state.listFilter ===
                "personal" && "active"}`}
              onClick={this.handleListChange}
              value="personal"
            >
              Personal List
            </button>
            <button
              className={`btn btn__showlists ${this.state.listFilter ===
                "work" && "active"}`}
              onClick={this.handleListChange}
              value="work"
            >
              Work List
            </button>
          </div>
        )}
        <h3 className="capitalize">{this.state.listFilter} List:</h3>
        <Search handleSearchItem={this.handleSearchItem} />
        <div className="items-list">
          <div className="items-list__due-today" />
          {this.props.items.length === 0 && <p>Add an item to start</p>}
          {/* Items with due dates first */}
          {(this.state.search !== ""
            ? this.state.filteredItems
            : this.props.items
          )
            .map(item => item)
            .filter(
              item =>
                item.completed === false &&
                (item.list === this.state.listFilter ||
                  this.state.listFilter === "entire") &&
                (item.dueDate !== null && item.dueDate < date.addDays(dayLimit))
            )
            .sort(function(a, b) {
              return cmpn(a.dueDate, b.dueDate) || cmp(a.priority, b.priority);
            })
            .map(item => (
              <Item
                date={date}
                key={item.id}
                text={item.text}
                dueDate={item.dueDate}
                notes={item.notes}
                notesAdv={item.notesAdv}
                list={item.list}
                priority={item.priority}
                createDate={item.createDate}
                completed={item.completed}
                completeDate={item.completeDate}
                editable={item.editable}
                id={item.id}
                handleRemoveItem={this.props.handleRemoveItem}
                handleCompleteItem={this.props.handleCompleteItem}
                handleEditItem={this.props.handleEditItem}
                handleEditItemReturn={this.props.handleEditItemReturn}
              />
            ))}
          {/* Items with no due dates next */}
          {(this.state.search !== ""
            ? this.state.filteredItems
            : this.props.items
          )
            .filter(
              item =>
                item.completed === false &&
                (item.list === this.state.listFilter ||
                  this.state.listFilter === "entire") &&
                (item.dueDate === null || item.dueDate > date.addDays(dayLimit))
            )
            .sort(function(a, b) {
              return (
                cmp(a.priority, b.priority) || cmpn(a.createDate, b.createDate)
              );
            })
            .map(item => (
              <Item
                date={date}
                key={item.id}
                text={item.text}
                dueDate={item.dueDate}
                notes={item.notes}
                notesAdv={item.notesAdv}
                list={item.list}
                priority={item.priority}
                createDate={item.createDate}
                completed={item.completed}
                completeDate={item.completeDate}
                editable={item.editable}
                id={item.id}
                handleRemoveItem={this.props.handleRemoveItem}
                handleCompleteItem={this.props.handleCompleteItem}
                handleEditItem={this.props.handleEditItem}
                handleEditItemReturn={this.props.handleEditItemReturn}
              />
            ))}
          {/* Completed items last */}
          {this.props.items.find(item => item.completed) && (
            <h4 className="items__complete">COMPLETED</h4>
          )}
          {(this.state.search !== ""
            ? this.state.filteredItems
            : this.props.items
          )
            .filter(
              item =>
                item.completed !== false &&
                (item.list === this.state.listFilter ||
                  this.state.listFilter === "entire")
            )
            .sort(function(a, b) {
              return cmp(b.completeDate, a.completeDate);
            })
            .slice(0, this.state.completedNumber)
            .map(item => (
              <div className="completed-item" key={item.id}>
                <Item
                  text={item.text}
                  priority={item.priority}
                  dueDate={item.dueDate}
                  notes={item.notes}
                  notesAdv={item.notesAdv}
                  list={item.list}
                  createDate={item.createDate}
                  completed={item.completed}
                  completeDate={item.completeDate}
                  id={item.id}
                  handleUndoItem={this.props.handleUndoItem}
                  handleEditItemReturn={this.props.handleEditItemReturn}
                  handleRemoveItem={this.props.handleRemoveItem}
                />
              </div>
            ))}
        </div>
        {this.state.completedNumber < this.props.items.length ? (
          <button className="btn btn__showmore" onClick={this.handleShowMore}>
            Show More
          </button>
        ) : (
          <p>All items being shown</p>
        )}
      </div>
    );
  }
}

export default Items;
