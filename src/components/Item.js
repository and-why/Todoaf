import React from 'react';
import Body from './Body';

const Item = (props) => (
  <div>
    <div className="Item_wrapper">
      <div className="Item_name">{props.itemText}</div>
      <div className="Item_weighting">{props.priority}</div>
      <button className="btn btn-remove Item_remove" onClick={(e) => {props.handleRemoveItem(props)}}>Delete</button>
    </div>
  </div>
);


export default Item;