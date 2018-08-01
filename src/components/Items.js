import React, { Component } from 'react';
import Item from './Item';


const Items = (props) => (
      <div className="items-list">
        {props.items.length === 0 && <p>Add an item to start</p> }
        
        {props.items.sort(function (a, b) {
            return b.priority - a.priority;
          }).map((item) => (
          <Item
            key={item.id}
            itemText={item.text}
            priority={item.priority}
            id={item.id}
            handleRemoveItem={props.handleRemoveItem}
          />
          
        ))}

      </div>
    );


export default Items;