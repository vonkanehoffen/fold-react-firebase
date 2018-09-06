import React, { Component } from 'react'
import keycode from 'keycode'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import { db } from '../firebase'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// import TagSuggestion from '../containers/TagSuggestion'
import TagSelect from '../containers/TagSelect'

class CreateFold extends Component {

  state = {
    title: '',
    uri: '',
    description: '',
    tagFilter: '',
    tags: [],
  }

  setProperty = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  setTags = tags => this.setState({ tags })

  save = () => {
    const userId = firebase.auth().currentUser.uid;
    const { history } = this.props
    const { title, uri, description, tags } = this.state

    // Write the fold
    db.collection('folds').add({
      title, uri, description, tags,
      userId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        history.push('/')
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    // Add / update tags
    db.collection('userTags').doc(firebase.auth().currentUser.uid).set({
      tags: firebase.firestore.FieldValue.arrayUnion(...tags)
    }, { merge: true })
      .then(function(docRef) {
        console.log("Tags written with ID: ", docRef);
        history.push('/')
      })
      .catch(function(error) {
        console.error("Error adding tags: ", error);
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
        <TagSelect selectedTags={this.state.tags} setTags={this.setTags}/>
        <Button variant="raised" onClick={this.save}>Save</Button>
      </div>
    )
  }

}


export default withRouter(CreateFold)
