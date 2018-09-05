import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'
import firebase from 'firebase'

class DatabaseTest extends Component {

  state = {
    folds: false,
    single: false,
  }

  componentDidMount() {
    // See https://joshpitzalis.svbtle.com/crud
    // db.collection('folds').get().then(collection => {
    //   const folds = collection.docs.map(doc => {
    //     console.log(doc)
    //     return {
    //       id: doc.id,
    //       ...doc.data()
    //     }
    //   })
    //   this.setState({ folds })
    // })

    db.collection('folds').onSnapshot(doc => {
      const folds = doc.docs.map(doc => {
            console.log('onSnapshot: ', doc)
            return {
              id: doc.id,
              ...doc.data()
            }
          })
          this.setState({ folds })
    })
    // db.collection('folds').doc('NFvayKBqfbG1MA58QqPO').onSnapshot(doc => {
    //   this.setState({ single: doc.data() })
    // })
  }

  writeUserData = () => {
    const userId = firebase.auth().currentUser.uid;
    console.log("USER ID:", userId)

    db.collection('folds').add({
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
