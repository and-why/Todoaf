import React, { Component } from 'react';
import Item from './Item';


const Items = (props) => (
      <div className="items-list">
        {props.items.length === 0 && <p>Add an item to start</p> }
        
        {props.items.sort(function (a, b) {
            return a.priority - b.priority;
          }).map((item) => (
          <Item
            key={item.id}
            text={item.text}
            priority={item.priority}
            id={item.id}
            handleRemoveItem={props.handleRemoveItem}
            handleEditItem={props.handleEditItem}
          />
          
        ))}

      </div>
    );


export default Items;