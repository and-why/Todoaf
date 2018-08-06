import React, { Component } from 'react';
import ItemsAll from './ItemsAll';

class Body extends Component {
  state = {
    items: [],
  };

  handleAddItem = (item, itemPriority) => {
    const newItem = {
      text: item,
      id: 1 + Math.random(),
      priority: itemPriority,
    };
    if (item === '') {
      // do nothing
    } else {
      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
      }));
    }
  };
  handleRemoveItem = itemToRemove => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => itemToRemove.id !== item.id),
    }));
  };
  handleEditItem = itemToEdit => {
    console.log(itemToEdit.id);
    let obj = this.state.items.find(obj => obj.id === itemToEdit.id);
    if (obj.priority === 3) {
      obj.priority = 1;
    } else {
      obj.priority++;
    }
    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };
  handleUndoItem = itemToEdit => {
    console.log(itemToEdit.id);
    let obj = this.state.items.find(obj => obj.id === itemToEdit.id);

    obj.priority = obj.priority - 10;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };
  handleCompleteItem = itemToEdit => {
    console.log('complete passed up');
    let obj = this.state.items.find(obj => obj.id === itemToEdit.id);

    obj.priority = obj.priority + 10;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };
  componentDidMount() {
    try {
      const json = localStorage.getItem('Storage');
      const items = JSON.parse(json);
      if (items) {
        this.setState(() => ({ items }));
      }
    } catch (e) {
      // do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const json = JSON.stringify(this.state.items);
    localStorage.setItem('Storage', json);
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <div className="Container">
        {console.log(this.state)}
        <div className="WidgetHeader">
          <h3 className="WidgetHeader__title">{this.props.title}</h3>
        </div>
        <div className="Items">
          <ItemsAll
            handleAddItem={this.handleAddItem}
            items={this.state.items}
            handleRemoveItem={this.handleRemoveItem}
            handleCompleteItem={this.handleCompleteItem}
            handleEditItem={this.handleEditItem}
            handleUndoItem={this.handleUndoItem}
          />
        </div>
      </div>
    );
  }
}

export default Body;
