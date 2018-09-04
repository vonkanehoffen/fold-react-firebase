import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config'
import firebase from 'firebase'

firebase.initializeApp(config.firebase)
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const githubAuthProvider = new firebase.auth.GithubAuthProvider()
githubAuthProvider.addScope('repo')

class App extends Component {

  doAuth() {
    firebase.auth().signInWithPopup(githubAuthProvider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      console.log('auth error:', error)
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  doSignOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.\
      console.log('sign out success')
    }).catch(function(error) {
      // An error happened.
      console.log('sign out fail', error)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reactss</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.doAuth}>Auth me!</button>
        <button onClick={this.doSignOut}>Sign out</button>
      </div>
    );
  }
}

export default App;
