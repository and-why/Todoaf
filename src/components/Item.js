import React from 'react';

const Item = (props) => (
  <div>
    <div className="Item_wrapper">
      <div className="Item_weighting">{props.count}</div>
      <div className="Item_name">{props.itemText}</div>
      <button className="Item_remove">Delete</button>
    </div>

  </div>
);


export default Item;