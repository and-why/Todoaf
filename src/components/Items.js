import React, { Component } from 'react';
import Item from './Item';


const Items = (props) => (
      <div>
        {props.items.length === 0 && <p>Add an item to start</p> }
        {props.items.map((item) => (
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