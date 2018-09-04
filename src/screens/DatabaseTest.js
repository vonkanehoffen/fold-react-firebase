import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'

class DatabaseTest extends Component {

  state = {
    folds: false
  }

  db = firebase.firestore()

  componentDidMount() {
    // See https://joshpitzalis.svbtle.com/crud
    this.db.collection('folds').get().then(collection => {
      const folds = collection.docs.map(doc => doc.data())
      this.setState({ folds })
    })
  }

  writeUserData = () => {
    const userId = firebase.auth().currentUser.uid;
    console.log("USER ID:", userId)

    this.db.collection('folds').add({
      description: 'from app again again',
      name: 'Mrs. App',
    })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div>
        <h2>DatabaseTest</h2>
        <button onClick={this.writeUserData}>Write DB</button>
        <pre>{JSON.stringify(this.state.folds, null, 2)}</pre>
      </div>
    )
  }

}


export default DatabaseTest 
