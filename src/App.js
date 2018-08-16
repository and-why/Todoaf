import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';

import { firebase } from './firebase';

class App extends Component {
  state = {
    items: [],
    authUser: null,
    storage: []
  };

  handleAddItem = (item, itemPriority, itemDate) => {
    const newItem = {
      text: item,
      id: 1 + Math.random(),
      priority: itemPriority,
      createDate: itemDate,
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
    let obj = this.state.items.find(obj => obj.id === itemToEdit.id);

    obj.editable = !obj.editable;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };
  handleEditItemReturn = (item, itemPriority, id, date) => {
    let obj = { text: item, priority: itemPriority, id, createDate: date, editable: false };

    let newArray = this.state.items.filter(item => item.id !== id).concat(obj);

    obj.editable = false;

    this.setState({
      items: newArray,
    });
  };

  handleUndoItem = itemToUndo => {
    let obj = this.state.items.find(obj => obj.id === itemToUndo.id);

    obj.priority = obj.priority - 10;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };

  handleCompleteItem = itemToEdit => {
    let obj = this.state.items.find(obj => obj.id === itemToEdit.id);

    obj.priority = obj.priority + 10;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    });
    const userId = firebase.auth.uid;
    firebase.database.ref('users/' + userId).set(this.state)
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
      <div className="App">
        <Header
          title={'Priorities'}
          subtitle={'A to do list based on priority weighting'}
          authUser={this.state.authUser}
        />
        <Body
          handleAddItem={this.handleAddItem}
          items={this.state.items}
          handleRemoveItem={this.handleRemoveItem}
          handleCompleteItem={this.handleCompleteItem}
          handleEditItem={this.handleEditItem}
          handleEditItemReturn={this.handleEditItemReturn}
          handleUndoItem={this.handleUndoItem}
        />
        {console.log(firebase.database)}
      </div>
    );
  }
}

export default App;
