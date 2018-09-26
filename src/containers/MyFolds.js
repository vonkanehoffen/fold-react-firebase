import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { db } from '../firebase'
import FullScreenLoader from '../components/FullScreenLoader'
import firebase from 'firebase/app'
import 'firebase/auth'
import Fold from '../components/Fold'
import ErrorChip from '../components/ErrorChip'
import NoFoldsCTA from '../components/NoFoldsCTA'
import media from '../helpers/mediaQueries'

class MyFolds extends Component {

  state = {
    loading: true,
    folds: false,
  }

  componentDidMount() {
    db.collection('folds').where('userId', '==', firebase.auth().currentUser.uid).orderBy('createdAt', 'desc').onSnapshot(doc => {
      const folds = doc.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      this.setState({
        loading: false,
        folds,
      })
    })
  }

  editFold = (id) => {
    this.props.history.push(`/edit/${id}`)
  }

  removeFold = async (id) => {
    try {
      await db.collection('folds').doc(id).delete()
    } catch (e) {
      // TODO: Error display
      console.error(e)
    }
  }

  render() {
    const { loading, folds } = this.state
    const { filterTags, setFilter } = this.props

    if(loading) return <FullScreenLoader/>

    if(!folds || !folds.length) return <NoFoldsCTA/>
    
    return (
      <Outer>
        {folds

          .filter(fold => {
            if(filterTags.length < 1) return true
            for(let term of filterTags) {
              if(fold.tags.includes(term)) return true
            }
          })

          .map(fold =>
          <Fold
            fold={fold}
            key={fold.id}
            edit={() => this.editFold(fold.id)}
            remove={() => this.removeFold(fold.id)}
            setFilter={setFilter}
          />)}
      </Outer>
    )
  }

}

const Outer = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${media.lg`justify-content: center;`}
`

export default withRouter(MyFolds)
