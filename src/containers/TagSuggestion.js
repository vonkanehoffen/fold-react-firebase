import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { db } from '../firebase'
import Tag from '../components/Tag'

// Not currently used.... go wit downshift for the time being. Use this for RN?

class TagSuggestion extends Component {

  static propTypes = {
    filter: PropTypes.string.isRequired,
    selected: PropTypes.array.isRequired,
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
  }

  state = {
    loading: true,
    userTags: []
  }

  componentDidMount() {
    db.collection('userTags').onSnapshot(doc => {
      console.log('userTags...', doc)
      this.setState({
        loading: false,
        userTags: doc.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
      })
    })
  }

  render() {
    return (
      <div>
        Tag select
        {this.state.userTags.map(tag => <Tag add={this.props.addTag}>{tag.title}</Tag>)}
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }

}


export default TagSuggestion
