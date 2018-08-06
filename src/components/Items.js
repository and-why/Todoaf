import React from 'react';
import Item from './Item';


const Items = (props) => (
      <div className="items-list">
        {props.items.length === 0 && <p>Add an item to start</p> }
        
        {props.items.sort(function (a, b) {
            return a.priority - b.priority;
          }).filter(item => item.priority < 10).map((item) => (
          <Item
            key={item.id}
            text={item.text}
            editable={item.editable}
            priority={item.priority}
            id={item.id}
            handleRemoveItem={props.handleRemoveItem}
            handleCompleteItem={props.handleCompleteItem}
            handleEditItem={props.handleEditItem}
          />
        ))}
        {props.items.find(item => item.priority >= 10) && <h4 className="items__complete">COMPLETED</h4>}
        {props.items.filter(item => item.priority >= 10).map((item) => (
          <Item
            key={item.id}
            text={item.text}
            priority={item.priority}
            id={item.id}
            handleUndoItem={props.handleUndoItem}
            handleRemoveItem={props.handleRemoveItem}
          />
        ))}

      </div>
    );


export default Items;