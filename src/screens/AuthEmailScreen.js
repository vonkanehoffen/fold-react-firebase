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
import TextInput from '../components/TextInput'
import FullScreenLoader from '../components/FullScreenLoader'
import Icon from '../components/Icon'

const STEP_EMAIL= 'STEP_EMAIL'
const STEP_PASSWORD= 'STEP_PASSWORD'
const STEP_SIGNUP = 'STEP_SIGNUP'

class AuthScreen extends React.Component {

  state = {
    isSignedIn: false, // Local signed-in state.
    isNewUser: false,
    email: '',
    password: '',
    error: false,
    loading: false,
    step: STEP_EMAIL,
  };

  setProperty = e => this.setState({ [e.target.name]: e.target.value })
  setLoading = (loading) => this.setState({ loading })
  setError = (error) => {
    console.error(error)
    this.setState({ error: error.message, loading: false })
  }
  setStep = (step) => this.setState({ step, loading: false, error: false })

  emailProvider = new firebase.auth.EmailAuthProvider()

  // Check if a user exists
  checkEmail = async () => {
    this.setLoading(true)
    try {
      const methods = await firebase.auth().fetchSignInMethodsForEmail(this.state.email)
      console.log('methods...', methods)
      if(methods.length < 1) {
        this.setStep(STEP_SIGNUP)
      } else if(methods[0] === 'password') {
        this.setStep(STEP_PASSWORD)
      } else {
        // TODO: It's an existed oAuth one probably. Deal with it...
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
      console.log('user...', user)
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
    // TODO: auth.sendPasswordResetEmail ....then what? Landing?
    // https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
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
    const { isSignedIn, error, email, password, loading, step } = this.state

    if(!isSignedIn && loading) return (
      <FullScreenLoader/>
    )
    if (!isSignedIn) {
      return (
        <CenterVH>
          <Background color="black"/>
          <Logo src={foldLogo}/>
          {step === STEP_EMAIL &&
            <Inner>
              <h2>Sign in with Email</h2>
              <SpacedTextInput type="email" placeholder="Email" value={email} name="email" onChange={this.setProperty} light/>
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
              <h4>{email} <Icon>check_circle</Icon></h4>
              <SpacedTextInput type="password" placeholder="Password" value={password} name="password" onChange={this.setProperty} light/>
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
            <h4>{email} <Icon>check_circle</Icon></h4>
            <SpacedTextInput type="password" placeholder="Password" value={password} name="password" onChange={this.setProperty} light/>
            <Forgot onClick={this.forgotPassword}>Forgotten your password?</Forgot>
            <div>
              <SpacedButton onClick={() => this.setStep(STEP_EMAIL)} mainColor={colors.primary} secondary>Cancel</SpacedButton>
              <SpacedButton onClick={this.signIn} mainColor={colors.primary}>Sign In</SpacedButton>
            </div>
            {error && <ErrorChip>{error}</ErrorChip>}
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
  .material-icons {
    vertical-align: middle;
    color: ${colors.tertiary};
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