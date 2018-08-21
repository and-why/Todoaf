import React, { Component } from 'react';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class Search extends Component {
  


  render() {
    return (
      <input type="text" onChange={this.handleSearchItem}/>
    )
  }
}

export default Search;