import React, { Component } from 'react';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class Search extends Component {
  
  handleSearchItem = e => {
    let search = e.target.value;
    this.props.handleSearchItem(search)
  }

  render() {
    return (
      <input type="text" onChange={this.handleSearchItem}/>
    )
  }
}

export default Search;