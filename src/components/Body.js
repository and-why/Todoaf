import React, { Component } from 'react';
import ItemsAll from './ItemsAll';

import { firebase } from '../firebase';

class Body extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Container">
        <div className="Items">
          {this.props.authUser ? (
            <ItemsAll
              handleAddItem={this.props.handleAddItem}
              items={this.props.items}
              handleRemoveItem={this.props.handleRemoveItem}
              handleCompleteItem={this.props.handleCompleteItem}
              handleEditItem={this.props.handleEditItem}
              handleEditItemReturn={this.props.handleEditItemReturn}
              handleUndoItem={this.props.handleUndoItem}
            />
          ) : (
            <p>Please Log In or Sign Up to start</p>
          )}
        </div>
      </div>
    );
  }
}

export default Body;
