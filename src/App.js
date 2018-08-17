import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';

import { firebase } from './firebase';
import { now } from '../node_modules/moment';

class App extends Component {
  state = {
    items: [],
    authUser: null,
    storage: [],
  };

  handleAddItem = (item, itemPriority, itemDate) => {
    const uid = firebase.auth.currentUser.uid;
    const itemsRef = firebase.database.ref(`users/${uid}`);

    const newItem = {
      text: item,
      priority: itemPriority,
      createDate: itemDate,
    };
    if (item === '') {
      // do nothing
    } else {
      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
      }));
      console.log(newItem);
      itemsRef.push(newItem);
    }
  };
  handleRemoveItem = itemToRemove => {
    const uid = firebase.auth.currentUser.uid;
    const itemToRemoveRef = firebase.database.ref(`users/${uid}/${itemToRemove.id}`);
    this.setState(prevState => ({
      items: prevState.items.filter(item => itemToRemove.id !== item.id),
    }));

    itemToRemoveRef.remove();
  };

  handleEditItem = itemToEdit => {
    let obj = this.state.items.find(obj => obj.id === itemToEdit.id);

    obj.editable = !obj.editable;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };

  handleEditItemReturn = (item, itemPriority, itemId, itemDate) => {
    const uid = firebase.auth.currentUser.uid;
    const itemsToUpdate = firebase.database.ref(`users/${uid}/${itemId}`);
    const editedItem = {
      id: itemId,
      text: item,
      priority: itemPriority,
      createDate: itemDate,
      editable: false
    };
   
      this.setState(prevState => ({
        items: prevState.items.filter((obj) => obj.id !== editedItem.id).concat(editedItem)
      }));
      itemsToUpdate.update(editedItem);
    
  };
  
  handleCompleteItem = itemToComplete => {
    console.log(itemToComplete)
    const uid = firebase.auth.currentUser.uid;
    const itemsToUpdate = firebase.database.ref(`users/${uid}/${itemToComplete.id}`);
    const completeDate = Date.now();
    const completedItem = {
      ...itemToComplete,
      completeDate: completeDate
    }

    this.setState(prevState => ({
      ...prevState,
      completedItem,
    }));


  };

  handleUndoItem = itemToUndo => {
    let obj = this.state.items.find(obj => obj.id === itemToUndo.id);

    obj.priority = obj.priority - 10;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));
  };
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
        const uid = firebase.auth.currentUser.uid;
        const itemsRef = firebase.database.ref(`users/${uid}`);
        itemsRef.on('value', snapshot => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              text: items[item].text,
              createDate: items[item].createDate,
              priority: items[item].priority,
            });
            this.setState({
              items: newState,
            });
          }
        });
      } else {
        this.setState({ authUser: null });
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {}

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
          authUser={this.state.authUser}
          handleAddItem={this.handleAddItem}
          items={this.state.items}
          handleRemoveItem={this.handleRemoveItem}
          handleCompleteItem={this.handleCompleteItem}
          handleEditItem={this.handleEditItem}
          handleEditItemReturn={this.handleEditItemReturn}
          handleUndoItem={this.handleUndoItem}
        />
        {console.log(this.state)}
      </div>
    );
  }
}

export default App;
