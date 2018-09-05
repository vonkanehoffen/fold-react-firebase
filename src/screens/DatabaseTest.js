import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase'

class DatabaseTest extends Component {

  state = {
    folds: false,
    single: false,
  }

  db = firebase.firestore()

  componentDidMount() {
    // See https://joshpitzalis.svbtle.com/crud
    this.db.collection('folds').get().then(collection => {
      const folds = collection.docs.map(doc => {
        console.log(doc)
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      this.setState({ folds })
    })

    this.db.collection('folds').doc('NFvayKBqfbG1MA58QqPO').onSnapshot(doc => {
      this.setState({ single: doc.data() })
    })
  }

  writeUserData = () => {
    const userId = firebase.auth().currentUser.uid;
    console.log("USER ID:", userId)

    this.db.collection('folds').add({
      description: 'from app with date',
      name: 'Mrs. App',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
        <pre style={{background: '#f98'}}>{JSON.stringify(this.state.single, null, 2)}</pre>
        <pre>{JSON.stringify(this.state.folds, null, 2)}</pre>
      </div>
    )
  }

}


export default DatabaseTest 
