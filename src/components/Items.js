import React from 'react';
import Item from './Item';

const cmp = function(a, b) {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
}

const Items = (props) => (
      <div className="items-list">
        {props.items.length === 0 && <p>Add an item to start</p> }
        
        {props.items.filter(item => item.priority < 10).sort(function(a, b) { 
         return cmp(a.priority,b.priority) || cmp(a.createDate,b.createDate)
          }).map((item) => (
          <Item
            key={item.id}
            text={item.text}
            createDate={item.createDate}
            editable={item.editable}
            priority={item.priority}
            id={item.id}
            handleRemoveItem={props.handleRemoveItem}
            handleCompleteItem={props.handleCompleteItem}
            handleEditItem={props.handleEditItem}
            handleEditItemReturn={props.handleEditItemReturn}
          />
        ))}
        {props.items.find(item => item.priority >= 10) && <h4 className="items__complete">COMPLETED</h4>}
        {props.items.sort(function (a, b) {
            return b.createDate - a.createDate;
          }).filter(item => item.priority >= 10).map((item) => (
          <Item
            key={item.id}
            text={item.text}
            priority={item.priority}
            createDate={item.createDate}
            id={item.id}
            handleUndoItem={props.handleUndoItem}
            handleEditItemReturn={props.handleEditItemReturn}
            handleRemoveItem={props.handleRemoveItem}
            
          />
        ))}

      </div>
    );


export default Items;