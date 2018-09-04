import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config'
import firebase from 'firebase'
import SignInScreen from './screens/SignInScreen'

firebase.initializeApp(config.firebase)

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reactss</h1>
        </header>
        <SignInScreen/>
      </div>
    );
  }
}

export default App;
