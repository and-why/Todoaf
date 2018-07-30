import React, {Component} from 'react';
import Items from './Items';
import AddItem from './AddItem';

class Body extends Component {
  state = {
    items: [],
    selectedItem: undefined
  };
  

  handleAddItem = (item) => {
    if (item === "") {
      // do nothing
    } else {
      this.setState((prevState) => ({
        items: prevState.items.concat(item),
      }));
    }
  };
  // handleRemoveItem = (itemToRemove) => {
  //   prevState.filter(itemToRemove => )
  // }
  render() {
    return (
      <div className="Container">
      {console.log(this.state)}
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
