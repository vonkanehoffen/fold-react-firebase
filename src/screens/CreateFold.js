import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'firebase'
import { db } from '../firebase'

class CreateFold extends Component {

  state = {
    title: '',
    uri: '',
    description: '',
  }

  setProperty = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  save = () => {
    const userId = firebase.auth().currentUser.uid;
    db.collection('folds').add({
      ...this.state,
      userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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
        <h3>Create fold:</h3>
        <TextField
          type="text"
          name="title"
          label="Title"
          value={this.state.title}
          onChange={this.setProperty}
        />
        <TextField
          type="text"
          name="uri"
          label="URI"
          value={this.state.uri}
          onChange={this.setProperty}
        />
        <TextField
          type="text"
          name="description"
          label="Description"
          value={this.state.description}
          onChange={this.setProperty}
        />
        <Button variant="raised" onClick={this.save}>Save</Button>
      </div>
    )
  }

}


export default CreateFold 
