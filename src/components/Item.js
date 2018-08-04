import React from 'react';

const Item = props => (
  <div
    className={`item__wrapper item__priority--${props.priority}`}
    onDoubleClick={e => {
      props.handleEditItem && props.handleEditItem(props);
    }}
  >
    <div className="item__name">{props.text}</div>
    {/* <div className="item__priority">{props.priority}</div> */}
    {/* <button className="btn item__edit" >Edit</button> */}

    {props.handleUndoItem && (
      <button
        className="btn btn-blue item__undo"
        onClick={e => {
          props.handleUndoItem(props);
        }}
      >
        {'\u21ba'}
      </button>
    )}
    {props.handleCompleteItem && (
      <button
        className="btn btn-success item__complete"
        onClick={e => {
          props.handleCompleteItem(props);
        }}
      >
        {'\u2714'}
      </button>
    )}
    <button
      className="btn btn-red item__remove"
      onClick={e => {
        props.handleRemoveItem(props);
      }}
    >
      {'\u2718'}
    </button>
  </div>
);

export default Item;
