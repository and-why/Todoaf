import React from 'react';
import Item from './Item';

const cmp = function(a, b) {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};

const Items = props => (
  <div className="items-list">
    {props.items.length === 0 && <p>Add an item to start</p>}

    {props.items
      .filter(item => item.completed === false)
      .sort(function(a, b) {
        return cmp(a.priority, b.priority) || cmp(a.createDate, b.createDate);
      })
      .map(item => (
        <Item
          key={item.id}
          text={item.text}
          priority={item.priority}
          createDate={item.createDate}
          completed={item.completed}
          completeDate={item.completeDate}
          editable={item.editable}
          id={item.id}
          handleRemoveItem={props.handleRemoveItem}
          handleCompleteItem={props.handleCompleteItem}
          handleEditItem={props.handleEditItem}
          handleEditItemReturn={props.handleEditItemReturn}
        />
      ))}
    {props.items.find(item => item.completed) && <h4 className="items__complete">COMPLETED</h4>}
    {props.items
      .filter(item => item.completed !== false)
      .sort(function(a, b) {
        return cmp(b.completeDate, a.completeDate);
      })
      .map(item => (
        <div className="completed-item" key={item.id}>
          <Item
            text={item.text}
            priority={item.priority}
            createDate={item.createDate}
            completed={item.completed}
            completeDate={item.completeDate}
            id={item.id}
            handleUndoItem={props.handleUndoItem}
            handleEditItemReturn={props.handleEditItemReturn}
            handleRemoveItem={props.handleRemoveItem}
          />
        </div>
      ))}
  </div>
);

export default Items;
