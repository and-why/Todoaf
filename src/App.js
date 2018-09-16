import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import './App.css';

import { firebase } from './firebase';

class App extends Component {
  state = {
    items: [],
    authUser: null,
  };

  handleAddItem = item => {
    console.log('app item:', item);
    const uid = firebase.auth.currentUser.uid;
    const itemsRef = firebase.database.ref(`users/${uid}`);
    const createDate = Date.now();

    const newItem = {
      ...item,
      createDate: createDate,
      completed: false,
      completeDate: null,
      editable: false,
    };
    if (item === '') {
      // do nothing
    } else {
      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
      }));
      itemsRef.push(newItem);
    }
    console.log('new item:', newItem);
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

  handleEditItemReturn = item => {
    console.log('app.js handleEditItemReturn: ', item);
    const uid = firebase.auth.currentUser.uid;
    const itemsToUpdate = firebase.database.ref(`users/${uid}/${item.id}`);
    const editedItem = {
      id: item.id,
      text: item.text,
      priority: item.priority,
      dueDate: item.dueDate,
      notes: item.notes,
      list: item.list,
      completed: false,
      completeDate: null,
      editable: false,
    };

    this.setState(prevState => ({
      items: prevState.items.filter(obj => obj.id !== editedItem.id).concat(editedItem),
    }));
    itemsToUpdate.update(editedItem);
  };

  handleCompleteItem = itemToComplete => {
    const uid = firebase.auth.currentUser.uid;
    const itemId = itemToComplete.id;
    const itemsToUpdate = firebase.database.ref(`users/${uid}/${itemId}`);

    const completedItem = {
      id: itemToComplete.id,
      text: itemToComplete.text,
      priority: itemToComplete.priority,
      createDate: itemToComplete.createDate,
      dueDate: itemToComplete.dueDate,
      notes: itemToComplete.notes ? itemToComplete.notes : '',
      list: itemToComplete.list ? itemToComplete.list : 'personal',
      editable: false,
      completed: true,
      completeDate: Date.now(),
    };
    this.setState(prevState => ({
      items: prevState.items.filter(obj => obj.id !== completedItem.id).concat(completedItem),
    }));
    itemsToUpdate.update(completedItem);
  };

  handleUndoItem = itemToUndo => {
    const uid = firebase.auth.currentUser.uid;
    const itemId = itemToUndo.id;
    const itemsToUpdate = firebase.database.ref(`users/${uid}/${itemId}`);

    let obj = this.state.items.find(obj => obj.id === itemToUndo.id);

    obj.completed = false;

    this.setState(prevState => ({
      items: prevState.items.filter(() => obj),
    }));

    itemsToUpdate.update(obj);
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
              dueDate: items[item].dueDate ? items[item].dueDate : null,
              notes: items[item].notes ? items[item].notes : '',
              list: items[item].list ? items[item].list : 'personal',
              priority: items[item].priority,
              completed: items[item].completed,
              completeDate: items[item].completeDate,
              editable: items[item].editable,
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
          title={'todoAF'}
          subtitle={'Prioritise tasks and get sh*t done.'}
          authUser={this.state.authUser}
          items={this.state.items}
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
        <Footer />
      </div>
    );
  }
}

export default App;
