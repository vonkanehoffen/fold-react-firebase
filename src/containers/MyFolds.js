import React, { Component } from 'react'
import { db } from '../firebase'
import FullScreenLoader from '../components/FullScreenLoader'
import firebase from 'firebase'

class MyFolds extends Component {

  state = {
    loading: true,
    folds: false,
  }

  componentDidMount() {
    db.collection('folds').where('userId', '==', firebase.auth().currentUser.uid).onSnapshot(doc => {
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

  render() {
    const { loading, folds } = this.state

    if(loading) return <FullScreenLoader/>

    if(!folds) return <div>Nope</div>

    return (
      <div>
        <pre>{JSON.stringify(folds, null, 2)}</pre>
      </div>
    )
  }

}


export default MyFolds 
