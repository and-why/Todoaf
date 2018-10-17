import React, { Component } from 'react';
import ItemsAll from './ItemsAll';
import ListChooser from './ListChooser';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFilter: 'entire',
    };
    this.handleListChange = this.handleListChange.bind(this.handleListChange)
  }

  handleListChange = e => {
    console.log('Body.j: ', e)
    this.setState({
      listFilter: e,
    });
  };
  render() {
    return (
      <div className="Container">
        <div className="Items">
          {this.props.authUser ? (
            <div>
              <ListChooser 
                handleListChange={this.handleListChange} 
                items={this.props.items}/>
              <ItemsAll
                listFilter={this.state.listFilter}
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
