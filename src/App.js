import React from 'react';
import logo from './logo.svg';
import './App.css';
import Room from './VideoConferencing/Room'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('state', this.state)
    return(
      <Room />
    )
  }
}

export default App;
