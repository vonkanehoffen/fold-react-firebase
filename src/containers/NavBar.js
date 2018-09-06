import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'
import { Link } from 'react-router-dom'

class NavBar extends Component {

  state = {}

  signOut = () => {
    firebase.auth().signOut()
  }
  deleteAccount = () =>
    firebase.auth().currentUser.delete()


  render() {
    return (
      <div>
        <h3>NavBar</h3>
        <p>Hello, {firebase.auth().currentUser.displayName}</p>
        <Link to="/">
          <Button variant="raised">Home</Button>
        </Link>
        <Link to="/new">
          <Button variant="raised">New</Button>
        </Link>
        <Button variant="outlined" onClick={this.signOut}>Sign Out</Button>
        <Button variant="flat" onClick={this.deleteAccount}>Delete account</Button>

      </div>
    )
  }

}


export default NavBar 
