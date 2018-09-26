import React from 'react';
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth'
import keycode from 'keycode'
import CenterVH from '../components/CenterVH'
import Background from '../components/Background'
import colors from '../colors'
import foldLogo from '../images/foldLogo@2x.png'
import Button from '../components/Button'
import ErrorChip from '../components/ErrorChip'
import TextInput from '../components/TextInput'
import FullScreenLoader from '../components/FullScreenLoader'
import Icon from '../components/Icon'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfoChip from '../components/InfoChip'

const STEP_EMAIL= 'STEP_EMAIL'
const STEP_PASSWORD= 'STEP_PASSWORD'
const STEP_SIGNUP = 'STEP_SIGNUP'
const STEP_EXISTING= 'STEP_EXISTING'

class AuthScreen extends React.Component {

  state = {
    isSignedIn: false, // Local signed-in state.
    isNewUser: false,
    email: '',
    password: '',
    displayName: '',
    error: false,
    loading: false,
    passwordResetLoading: false,
    passwordResetSent: false,
    step: STEP_EMAIL,
    existingProvider: false,
  };

  setProperty = e => this.setState({ [e.target.name]: e.target.value })
  setLoading = (loading) => this.setState({ loading })
  setError = (error) => {
    console.error(error)
    this.setState({ error: error.message, loading: false })
  }
  setStep = (step) => this.setState({ step, loading: false, error: false })

  // Check if a user exists
  checkEmail = async () => {
    this.setLoading(true)
    try {
      const methods = await firebase.auth().fetchSignInMethodsForEmail(this.state.email)
      console.log('methods...', methods)
      if(methods.length < 1) {
        this.setStep(STEP_SIGNUP)
        this.displayNameInput.focus()
      } else if(methods[0] === 'password') {
        this.setStep(STEP_PASSWORD)
        this.passwordInput.focus()
      } else {
        this.setState({ existingProvider: methods[0]})
        this.setStep(STEP_EXISTING)
      }
    } catch (e) {
      this.setError(e)
    }
  }

  // Create a user
  createUser = async () => {
    this.setLoading(true)
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)

      await firebase.auth().currentUser.updateProfile({
        displayName: this.state.displayName,
      })

      this.setLoading(false)
    } catch (e) {
      this.setError(e)
    }
  }

  // Sign in user
  signIn = async () => {
    this.setLoading(true)
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      console.log('user signed in...', user)
      this.setLoading(false)
    } catch (e) {
      this.setError(e)
    }
  }

  // Send password reset email
  forgotPassword = async () => {
    this.setState({ passwordResetLoading: true })
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email)
      this.setState({ passwordResetSent: true })
    } catch (e) {
      this.setError(e)
    }
    this.setState({ passwordResetLoading: false })
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
    const { isSignedIn, error, email, password, displayName, loading, step, existingProvider } = this.state

    if(!isSignedIn && loading) return (
      <FullScreenLoader/>
    )
    if (!isSignedIn) {
      return (
        <CenterVH>
          <Background color="black"/>
          <Link to="/auth">
            <Logo src={foldLogo}/>
          </Link>

          {step === STEP_EMAIL &&
            <Inner>
              <h2>Sign in with Email</h2>
              <SpacedTextInput
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={this.setProperty}
                onKeyDown={(e) => keycode(e) === 'enter' && this.checkEmail()}
                light
              />
              <div>
                <Link to="/auth">
                  <SpacedButton mainColor={colors.primary} secondary>Cancel</SpacedButton>
                </Link>
                <SpacedButton onClick={this.checkEmail} mainColor={colors.primary}>Next</SpacedButton>
              </div>
              {error && <ErrorChip>{error}</ErrorChip>}
            </Inner>
          }

          {step === STEP_SIGNUP &&
            <Inner>
              <h2>Create an account</h2>
              <EmailDisplay>{email} <Icon>check_circle</Icon></EmailDisplay>
              <SpacedTextInput
                type="text"
                placeholder="Display name"
                value={displayName}
                name="displayName"
                ref={i => this.displayNameInput = i}
                onChange={this.setProperty}
                onKeyDown={(e) => keycode(e) === 'enter' && this.signUpPasswordInput.focus()}
                light
              />
              <SpacedTextInput
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                ref={i => this.signUpPasswordInput = i}
                onChange={this.setProperty}
                onKeyDown={(e) => keycode(e) === 'enter' && this.createUser()}
                light/>
              <div>
                <SpacedButton onClick={() => this.setStep(STEP_EMAIL)} mainColor={colors.primary} secondary>Cancel</SpacedButton>
                <SpacedButton onClick={this.createUser} mainColor={colors.primary}>Next</SpacedButton>
              </div>
              {error && <ErrorChip>{error}</ErrorChip>}
            </Inner>
          }

          {step === STEP_PASSWORD &&
          <Inner>
            <h2>Enter your password</h2>
            <EmailDisplay>{email} <Icon>check_circle</Icon></EmailDisplay>
            <SpacedTextInput
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              ref={i => this.passwordInput = i}
              onChange={this.setProperty}
              onKeyDown={(e) => keycode(e) === 'enter' && this.signIn()}
              light/>
            {this.state.passwordResetLoading ?
              <CircularProgress style={{color: colors.tertiary}}/>
              :
              <div>
                { this.state.passwordResetSent ?
                  <InfoChip icon="check_circle">Password reset email sent.</InfoChip>
                  :
                  <Forgot onClick={this.forgotPassword}>Forgotten your password?</Forgot>
                }
              </div>
            }

            <div>
              <SpacedButton onClick={() => this.setStep(STEP_EMAIL)} mainColor={colors.primary} secondary>Cancel</SpacedButton>
              <SpacedButton onClick={this.signIn} mainColor={colors.primary}>Sign In</SpacedButton>
            </div>

            {error && <ErrorChip>{error}</ErrorChip>}

          </Inner>
          }

          {step === STEP_EXISTING &&
          <Inner>
            <h2>You already have an account.</h2>
            <EmailDisplay>Registered via {existingProvider}. <Link to="/auth">Go back and sign in.</Link></EmailDisplay>
          </Inner>
          }


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
  position: fixed;
  width: 100px;
  top: 1rem;
  left: 1rem;
`

const Inner = styled.div`
  color: ${colors.primary};
  //text-align: center;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width:30rem;
  h2 {
    margin-bottom: 2rem;
  }
`

const EmailDisplay = styled.h4`
  margin-bottom: 1rem;
  .material-icons {
    vertical-align: middle;
    color: ${colors.tertiary};
  }
  a {
    color: ${colors.secondary};
  }
`

const Forgot = styled.div`
  color: ${colors.tertiary};
  margin-bottom: 2rem; 
  cursor: pointer;
`

const SpacedTextInput = styled(TextInput)`
  margin: 2rem 0 3rem 0;
`

const SpacedButton = styled(Button)`
  margin: 1rem 1rem 1rem 0;
  display: inline-block;
`

export default AuthScreen