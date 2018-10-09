import React, { Component } from 'react'
import { db } from '../firebase'
import firebase from 'firebase'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { colorFromString } from '../helpers/color'
import colors from '../colors'
import PropTypes from 'prop-types'
// import Tag from '../components/Tag'

class MyTags extends Component {

  static propTypes = {
    selectedTags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired,
  }

  state = {
    inputValue: '',
    loading: true,
    userTags: [],
  }

  componentDidMount() {
    this.unsubscribe = db.collection('userTags').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      this.setState({
        loading: false,
        userTags: doc.data() ? doc.data().tags : []
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  toggleTag = (tag) => {
    const { setTags, selectedTags } = this.props
    if(selectedTags.includes(tag)) {
      setTags(selectedTags.filter(t => t !== tag))
    } else {
      setTags([tag, ...selectedTags])
    }
  }

  render() {
    const { selectedTags } = this.props;
    const { inputValue, loading, userTags } = this.state;

    if(loading) return <CircularProgress/>

    if(userTags.length < 1) return false

    return (
      <Outer>
        {userTags.map(tag =>
          <Tag color={colorFromString(tag)} key={tag} onClick={() => this.toggleTag(tag)}>
            {selectedTags.includes(tag) && <i className="material-icons">close</i>}
            {tag}
          </Tag>
        )}
      </Outer>
    )
  }

}

const Outer = styled.div`
  display: flex;
  overflow: auto;
  ::-webkit-scrollbar { 
    background:${colors.pageBg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.controlBg};
    height: .5rem;
    border-radius: .5rem;
    border: solid 3px ${colors.pageBg};
  }
`

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  color: white;
  background:${props => props.color};
  padding: 1rem 1rem;
  line-height: 1rem;
  margin: 1rem .5rem;
  border-radius: 5px;
  cursor: pointer;
  text-transform: capitalize;
  
`
export default MyTags 
