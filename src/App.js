import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignInScreen from './screens/SignInScreen'
import DatabaseTest from './screens/DatabaseTest'
import CreateFold from './screens/CreateFold'



class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SignInScreen/>
        <CreateFold/>
        <DatabaseTest/>
      </div>
    );
  }
}

export default App;
