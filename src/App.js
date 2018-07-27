import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header 
          // title={'Priorities'} 
          title={'Exercise Diary'} 
          //subtitle={'A to do list based on priorities & deadlines'} 
          subtitle={'A simple exercise diary'} 
        />
        <Body 
          // title={'To Do'} 
          title={'Exercises'} 
        />
      </div>
    );
  }
}

export default App;
