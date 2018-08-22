import React, { Component } from 'react';
import Item from './Item';
import Search from './Search';

const cmp = function(a, b) {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredItems: [],
      search: '',
    };
  }

  handleSearchItem = e => {
    this.setState({
      search: e,
    });
    let filteredItems = this.props.items.filter(item => item.text.toLowerCase().includes(e));
    this.setState({
      filteredItems: filteredItems,
    });
  };

  render() {
    return (
      <div>
        <Search handleSearchItem={this.handleSearchItem} />
        <div className="items-list">
          {this.props.items.length === 0 && <p>Add an item to start</p>}
          {(this.state.search !== '' ? this.state.filteredItems : this.props.items)
            .filter(item => item.completed === false)
            .sort(function(a, b) {
              return (
                cmp(a.dueDate, b.dueDate) ||
                cmp(a.priority, b.priority) ||
                cmp(a.createDate, b.createDate)
              );
            })
            .map(item => (
              <Item
                key={item.id}
                text={item.text}
                dueDate={item.dueDate}
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
          {this.props.items.find(item => item.completed) && (
            <h4 className="items__complete">COMPLETED</h4>
          )}
          {(this.state.search !== '' ? this.state.filteredItems : this.props.items)
            .filter(item => item.completed !== false)
            .sort(function(a, b) {
              return cmp(b.completeDate, a.completeDate);
            })
            .map(item => (
              <div className="completed-item" key={item.id}>
                <Item
                  text={item.text}
                  priority={item.priority}
                  dueDate={item.dueDate}
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
      </div>
    );
  }
}

export default Items;
