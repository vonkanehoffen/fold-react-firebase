import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'

class NavBar extends Component {

  state = {}

  signOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <div>
        <h3>NavBar</h3>
        <Button variant="outlined" onClick={this.signOut}>Sign Out</Button>
      </div>
    )
  }

}


export default NavBar 
