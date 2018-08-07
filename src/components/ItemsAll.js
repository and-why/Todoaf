import React from 'react';
import AddItem from './AddItem';
import Items from './Items';


const ItemsAll = (props) => (
  <div className="items">
    <AddItem handleAddItem={props.handleAddItem}/>
    <Items 
      items={props.items} 
      handleUndoItem={props.handleUndoItem} 
      handleRemoveItem={props.handleRemoveItem} 
      handleCompleteItem={props.handleCompleteItem} 
      handleEditItem={props.handleEditItem}
      handleEditItemReturn={props.handleEditItemReturn}
    />
  </div>
)

export default ItemsAll;