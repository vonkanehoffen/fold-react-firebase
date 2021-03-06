import React, { Component } from 'react'
import keycode from 'keycode'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import TagSelect from '../containers/TagSelect'
import colors from '../colors'
import NavBar from '../containers/NavBar'
import Background from '../components/Background'
import Icon from '../components/Icon'
import ErrorChip from '../components/ErrorChip'
import config from '../config'

class CreateUpdateFold extends Component {

  state = {
    title: '',
    uri: '',
    description: '',
    tagFilter: '',
    tags: [],
    error: false,
    loading: false,
  }

  // If we're editing, we will have an existing ID passed in
  // ....so read data into state
  async componentDidMount() {

    const { id } = this.props.match.params
    if(id) {
      this.setLoading(true)
      try {
        const fold = await db.collection('folds').doc(id).get()
        if(fold.exists) {
          this.setState(fold.data())
        }
      } catch(e) {
        this.setError(e.message)
      }
      this.setLoading(false)
    }

    // Scrape page meta if this is run as chrome extension
    if(config.isChromeExt) {

      /*global chrome*/
      chrome.runtime.onMessage.addListener((request, sender) => {
          if (request.scrape) {
            this.setState({
              title: sender.tab.title,
              uri: sender.tab.url,
              description: request.scrape.description
            })
          }
        }
      );

      chrome.tabs.executeScript({
        file: 'foldMetaScraper.js'
      });

    }
  }

  setProperty = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  setTags = tags => this.setState({ tags })
  setLoading = loading => this.setState({ loading })
  setError = error => this.setState({ error })

  save = async () => {
    const userId = firebase.auth().currentUser.uid;
    const { history } = this.props
    let { title, uri, description, tags } = this.state

    if(!title) return this.setError('You must enter a title')

    if(!(
      uri.startsWith('//') ||
      uri.startsWith('http://') ||
      uri.startsWith('https://')
    )) {
      uri = `//${uri}`
      this.setState({ uri })
    }

    const { id } = this.props.match.params

    this.setLoading(true)
    this.setError(false)
    let error

    try {
      const docRef = id ?
        // Update
        await db.collection('folds').doc(id).update({
          title, uri, description, tags,
        }) :
        // Create
        await db.collection('folds').add({
          title, uri, description, tags,
          userId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
    } catch(e) {
      error = e.message
    }

    if(tags.length) {
      try {
        await db.collection('userTags').doc(firebase.auth().currentUser.uid).set({
          tags: firebase.firestore.FieldValue.arrayUnion(...tags)
        }, { merge: true })
      } catch (e) {
        error = e.message // TODO: Duplicate... would overwrite first error...
      }
    }

    this.setLoading(false)
    if(error) {
      this.setError(error)
    } else {
      if(config.isChromeExt) {
        history.push('/successchrome')
      } else {
        history.push('/')
      }
    }

  }

  render() {

    const { title, uri, description, tags, loading, error } = this.state
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
            value={title}
            onChange={this.setProperty}
            disabled={loading}
          />
        </Spacer>
        <Spacer>
          <StyledIcon>link</StyledIcon>
          <TextInput
            type="text"
            name="uri"
            placeholder="URI"
            value={uri}
            onChange={this.setProperty}
            disabled={loading}
          />
        </Spacer>
        <Spacer>
          <StyledIcon>format_align_left</StyledIcon>
          <TextInput
            type="text"
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.setProperty}
            disabled={loading}
          />
        </Spacer>
        <Spacer>
          <StyledIcon>label_outline</StyledIcon>
          <TagSelect selectedTags={tags} setTags={this.setTags}/>
        </Spacer>
        <Spacer>
          {loading ?
            <CircularProgress/>
          :
            <div>
              <Button onClick={this.save}>Save</Button>
              <Button onClick={() => this.props.history.goBack()} secondary>Cancel</Button>
            </div>
          }
        </Spacer>
        {error && <ErrorChip>{error}</ErrorChip>}
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
