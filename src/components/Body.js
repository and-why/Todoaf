import React, {Component} from 'react';
import Items from './Items';
import AddItem from './AddItem';

class Body extends Component {
  state = {
    items: [],
    selectedItem: undefined
  };
  
  handleAddItem = (item) => {
    const prevState = [...this.state.items]
    const newItemState =  prevState.concat((item))    
    this.setState({
      prevState,
      item
    });
    console.log(this.state);
  };
  handleRemoveItem = (itemToRemove) => {
    console.log(itemToRemove)
  }
  render() {
    return (
      <div className="Container">
      <div className="WidgetHeader">
        <h3 className="WidgetHeader__title">{this.props.title}</h3>
      </div>
      <div className="Items">
      <AddItem handleAddItem={this.handleAddItem}/>
      <Items items={this.state.items} handleRemoveItem={this.handleRemoveItem}/>
      </div>
    </div>
    )
  }
};

export default Body;
