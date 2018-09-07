import React, { Component } from 'react'
import { db } from '../firebase'
import FullScreenLoader from '../components/FullScreenLoader'
import firebase from 'firebase'
import Fold from '../components/Fold'

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
        {folds.map(fold => <Fold fold={fold} key={fold.id}/>)}
      </div>
    )
  }

}


export default MyFolds 
