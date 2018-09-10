import React, { Component } from 'react'
import keycode from 'keycode'
import firebase from 'firebase'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase'
import TextField from '@material-ui/core/TextField'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// import TagSuggestion from '../containers/TagSuggestion'
import TagSelect from '../containers/TagSelect'
import colors from '../colors'
import NavBar from '../containers/NavBar'
import Background from '../components/Background'
import Icon from '../components/Icon'

class CreateUpdateFold extends Component {

  state = {
    title: '',
    uri: '',
    description: '',
    tagFilter: '',
    tags: [],
  }

  // If we're editing, we will have an existing ID passed in
  // ....so read data into state
  async componentDidMount() {
    const { id } = this.props.match.params
    if(id) {
      try {
        const fold = await db.collection('folds').doc(id).get()
        if(fold.exists) {
          this.setState(fold.data())
        }
      } catch(e) {
        // TODO: Error UI
        console.error(e)
      }
    }
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

    // Editing an existing post?
    const { id } = this.props.match.params
    if(id) {
      db.collection('folds').doc(id).update({
        title, uri, description, tags,
      })
        .then(function(docRef) {
          console.log("Document updated: ", docRef);
          history.push('/')
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    } else {
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
    }

    // Add / update tags
    if(tags.length) {
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
  }

  render() {
    return (
      <div>
        <Background color={colors.primary}/>
        <NavBar/>
        <Spacer>
          <h1>Create New</h1>
        </Spacer>
        <Spacer>
          <StyledIcon>add_circle_outline</StyledIcon>
          <TextInput
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.setProperty}
          />
        </Spacer>
        <Spacer>
          <StyledIcon>link</StyledIcon>
          <TextInput
            type="text"
            name="uri"
            placeholder="URI"
            value={this.state.uri}
            onChange={this.setProperty}
          />
        </Spacer>
        <Spacer>
          <StyledIcon>format_align_left</StyledIcon>
          <TextInput
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.setProperty}
          />
        </Spacer>
        <Spacer>
          <StyledIcon>label_outline</StyledIcon>
          <TagSelect selectedTags={this.state.tags} setTags={this.setTags}/>
        </Spacer>
        <Spacer>
          <Button onClick={this.save}>Save</Button>
        </Spacer>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

const Spacer = styled.div`
  display: flex;
  padding: 1rem;
`

const StyledIcon = styled(Icon)`
  font-size: 2rem;
  margin-right: 1rem;
`


export default withRouter(CreateUpdateFold)
