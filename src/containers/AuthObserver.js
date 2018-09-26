import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import FullScreenLoader from '../components/FullScreenLoader'

class AuthObserver extends Component {

  state = {
    loading: true,
    user: false,
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged')
      this.setState({
        loading: false,
        user,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { loading, user } = this.state

    if(loading) return <FullScreenLoader/>

    if(!user) return (
      <Redirect to="/auth"/>
    )

    return (
      <div>{this.props.children}</div>
    )
  }

}


export default AuthObserver 
