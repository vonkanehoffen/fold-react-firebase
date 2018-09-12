import React from 'react';
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import firebase from 'firebase';
import CenterVH from '../components/CenterVH'
import Background from '../components/Background'
import { db } from '../firebase'
import colors from '../colors'
import foldLogo from '../images/foldLogo@2x.png'
import Button from '../components/Button'
import ErrorChip from '../components/ErrorChip'

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
            <SpacedButton onClick={() => this.doSignIn(this.googleProvider)} mainColor={colors.googleBlue} fgColor="white" filled>Sign in with Google</SpacedButton>
            <SpacedButton onClick={() => this.doSignIn(this.githubProvider)} mainColor="#fff" filled>Sign in with Github</SpacedButton>
            <Link to="/auth/email">
              <SpacedButton mainColor={colors.primary} filled>Sign in with Email</SpacedButton>
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

const SpacedButton = styled(Button)`
  margin: .5rem;
`

export default AuthScreen