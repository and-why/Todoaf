import React from 'react';
import EditItem from './EditItem';

const Item = props => (
  <div
    className={`item__wrapper item__priority--${props.priority}`}
    onDoubleClick={e => {
      props.priority < 9 && props.handleEditItem(props);
    }}
  >
    <div className="item__name">{props.editable ? <EditItem {...props} handleEditItemReturn={props.handleEditItemReturn} /> : props.text}</div>
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

    {!props.editable && (props.handleCompleteItem && (
      <button
        className="btn btn-success item__complete"
        onClick={e => {
          props.handleCompleteItem(props);
        }}
      >
        {'\u2714'}
      </button>
    ))}

   {!props.editable && <button
      className="btn btn-red item__remove"
      onClick={e => {
        props.handleRemoveItem(props);
      }}
    >
      {'\u2718'}
    </button>}
  </div>
);

export default Item;
