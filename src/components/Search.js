import React, { Component } from 'react';

class Search extends Component {
  handleSearchItem = e => {
    let search = e.target.value.toLowerCase();
    this.props.handleSearchItem(search);
  };

  render() {
    return (
      <div className="items__search">
        <input type="text" onChange={this.handleSearchItem} placeholder="Filter Items" />
      </div>
    );
  }
}

export default Search;
