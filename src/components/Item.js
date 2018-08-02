import React from 'react';


const Item = (props) => (
  <div>
    <div className={`item__wrapper item__priority--${props.priority}`} onDoubleClick={(e) => {props.handleEditItem(props)}}>
      <div className="item__name">{props.itemText}</div>
      {/* <div className="item__priority">{props.priority}</div> */}
      {/* <button className="btn item__edit" >Edit</button> */}
      <button className="btn btn-success item__remove" onClick={(e) => {props.handleRemoveItem(props)}}>{'\u2714'}</button>
      <button className="btn btn-red item__remove" onClick={(e) => {props.handleRemoveItem(props)}}>{'\u2718'}</button>
    </div>
  </div>
);


export default Item;