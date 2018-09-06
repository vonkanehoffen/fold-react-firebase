import React from 'react';
import { Redirect } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { db } from '../firebase'

// See https://github.com/firebase/firebaseui-web#firebaseui-for-web--auth

class AuthScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    isNewUser: false,
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (res) => {
        console.log('signInSuccessWithAuthResult:', res.additionalUserInfo)
        this.setState({ isNewUser: res.additionalUserInfo.isNewUser })
      }
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }

    if(this.state.isNewUser) return <Redirect to="/welcome"/>

    return (
      <Redirect to="/"/>
    )
    
  }
}

export default AuthScreen