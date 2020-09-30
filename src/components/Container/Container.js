import React, { Component } from 'react'
import './Container.css'
import List from '../ListTask/ListTask.js'

class Container extends Component {
  render() {
    return (
      <div className="container">
        <List></List>
      </div>
    );
  }
}

export default Container;