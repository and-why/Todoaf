import React, { Component } from 'react';
import Item from './Item';

const Items = (props) => (
      <div>
        {props.items.length === 0 && <p>Add an item to start</p> }
        {props.items.map((item, index) => (
          <Item
            key={1 + Math.random()}
            itemText={item}
            count={index + 1}
          />
        ))}

      </div>
    );


export default Items;