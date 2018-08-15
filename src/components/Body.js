import React, { Component } from 'react';
import ItemsAll from './ItemsAll';

import { firebase } from '../firebase';

const Body = props => (
  <div className="Container">
    <div className="Items">
      <ItemsAll
        handleAddItem={props.handleAddItem}
        items={props.items}
        handleRemoveItem={props.handleRemoveItem}
        handleCompleteItem={props.handleCompleteItem}
        handleEditItem={props.handleEditItem}
        handleEditItemReturn={props.handleEditItemReturn}
        handleUndoItem={props.handleUndoItem}
      />
    </div>
  </div>
);

export default Body;
