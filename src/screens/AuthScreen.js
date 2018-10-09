import React from 'react';
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth'
import CenterVH from '../components/CenterVH'
import Background from '../components/Background'
import { db } from '../firebase'
import colors from '../colors'
import foldLogo from '../images/foldLogo@2x.png'
import ErrorChip from '../components/ErrorChip'
import { EmailButton, GithubButton, GoogleButton } from '../components/SignInButtons'

class AuthScreen extends React.Component {

  state = {
    isSignedIn: false, // Local signed-in state.
    isNewUser: false,
    error: false,
  };

  setError = (error) => this.setState({ error })
  googleProvider = new firebase.auth.GoogleAuthProvider()
  githubProvider = new firebase.auth.GithubAuthProvider()

  doSignIn = async (provider) => {
    try {
      const result = await firebase.auth().signInWithPopup(provider)
      const token = result.credential.accessToken
      const user = result.user
    } catch (e) {
      console.error(e)
      this.setError(e.message)
    }
  }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    );

    // Chrome extension google auth
    // See https://developer.chrome.com/apps/app_identity
    // https://github.com/firebase/quickstart-js/tree/master/auth/chromextension
    /*global chrome */
    if(typeof chrome !== 'undefined' && chrome.identity) {
      chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
        var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
        console.log('credential: ', credential)
        firebase.auth().signInAndRetrieveDataWithCredential(credential);
      });

    }
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isSignedIn, error } = this.state

    if (!isSignedIn) {
      return (
        <CenterVH>
          <Background color="black"/>
          <Inner>
            <Logo src={foldLogo}/>
            <h1>Bookmarking <span>Reimagined.</span></h1>
            <GoogleButton onClick={() => this.doSignIn(this.googleProvider)}/>
            <GithubButton onClick={() => this.doSignIn(this.githubProvider)}/>
            <Link to="/auth/email">
              <EmailButton/>
            </Link>
            {error && <ErrorChip>{error}</ErrorChip>}
          </Inner>
        </CenterVH>
      );
    }

    if(this.state.isNewUser) return <Redirect to="/welcome"/>

    return (
      <Redirect to="/"/>
    )
    
  }
}

const Logo = styled.img`
  width: 10rem;
  margin-bottom: 1rem;
`
const Inner = styled.div`
  color: ${colors.primary};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: ${colors.secondary};
    margin-bottom: 1rem;
    span { color: ${colors.tertiary}; }
  }
`

export default AuthScreen