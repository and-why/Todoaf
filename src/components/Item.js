import React from 'react';


const Item = (props) => (
  <div>
    <div className="item__wrapper">
      <div className="item__name">{props.itemText}</div>
      <div className={`item__priority item__priority--${props.priority}`}>{props.priority}</div>
      <button className="btn btn-red item__remove" onClick={(e) => {props.handleRemoveItem(props)}}>Delete</button>

    </div>
  </div>
);


export default Item;