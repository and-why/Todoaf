import React from 'react';
import AddItem from './AddItem';
import Items from './Items';


const ItemsAll = (props) => (
  <div className="items">
    <AddItem handleAddItem={props.handleAddItem}/>
    <Items items={props.items} handleRemoveItem={props.handleRemoveItem}/>
  </div>
)

export default ItemsAll;