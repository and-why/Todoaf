import React, { Component } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header 
          title={'Priorities'} 
          subtitle={'A to do list based on priority weighting'} 
        />
        <Body 
          title={'To Do'} 
        />
      </div>
    );
  }
}

export default App;
