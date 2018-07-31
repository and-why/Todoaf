import React, {Component} from 'react';
import Items from './Items';
import AddItem from './AddItem';

class Body extends Component {
  state = {
    items: []
  };
  
  handleAddItem = (item) => {
    const newItem = {
      text: item,
      id: 1 + Math.random()
    }
    if (item === "") {
      // do nothing
    } else {
      this.setState(prevState => ({
        items: prevState.items.concat(newItem)
      }));
    }
  };
  handleRemoveItem = (itemToRemove) => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => itemToRemove.id !== item.id)
    }))
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('Storage')
      const items =JSON.parse(json)
      if(items) {
        this.setState(() =>({items}))
      }
    } catch(e) {
      // do nothing
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.items.length !== this.state.items.length) {
      const json = JSON.stringify(this.state.items);
      localStorage.setItem('Storage', json)
    }
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
        <AddItem handleAddItem={this.handleAddItem}/>
        <Items items={this.state.items} handleRemoveItem={this.handleRemoveItem}/>
        </div>
      </div>
    )
  }
};

export default Body;
