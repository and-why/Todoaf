import React, { Component } from 'react';

class ItemsWithDueDates extends Component {
  render() {
    return (
      <div>
        {/* Items with due dates first */}
        {(this.state.search !== '' ? this.state.filteredItems : this.props.items)
          .map(item => item)
          .filter(
            item =>
              item.completed === false &&
              item.list === this.state.listFilter &&
              (item.dueDate !== null && item.dueDate < date.addDays(dayLimit)),
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
      </div>
    );
  }
}

export default ItemsWithDueDates;
