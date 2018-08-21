import React, { Component } from 'react';
import ItemsAll from './ItemsAll';

class Body extends Component {
  render() {
    return (
      <div className="Container">
        <div className="Items">
          {this.props.authUser ? (
            <div>
              <ItemsAll
                authUser={this.props.authUser}
                handleAddItem={this.props.handleAddItem}
                items={this.props.items}
                handleRemoveItem={this.props.handleRemoveItem}
                handleCompleteItem={this.props.handleCompleteItem}
                handleEditItem={this.props.handleEditItem}
                handleEditItemReturn={this.props.handleEditItemReturn}
                handleUndoItem={this.props.handleUndoItem}
              />
            </div>
          ) : (
            <div>
              <p>Please Log In or Sign Up to start</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Body;
