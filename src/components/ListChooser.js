import React, { Component } from 'react';

export default class ListChooser extends Component {
  constructor(props) {
    super(props);
    this.state ={
      listFilter: this.props.listFilter
    }
  }

  handleChange = e => {
    const value = e.target.value;
    this.setState({listFilter: value})
    this.props.handleListChange(value)
    console.log("ListChoose.js: ", this.state.listFilter);
  };

  render() {
    return (
      <div>

      {(this.props.items.find(item => item.list === 'work') ||
      this.state.listFilter === 'work') && (
        <div className="btn__showlist-wrapper">
        <button className={`btn btn__showlists ${this.state.listFilter === 'entire' && 'active'}`} onClick={this.handleChange} value="entire">
          Entire List
        </button>
        <button className={`btn btn__showlists ${this.state.listFilter === 'personal' && 'active'}`} onClick={this.handleChange} value="personal">
          Personal List
        </button>
        <button className={`btn btn__showlists ${this.state.listFilter === 'work' && 'active'}`} onClick={this.handleChange} value="work">
          Work List
        </button>
      </div>
    )}
    </div>
    )
  }
}