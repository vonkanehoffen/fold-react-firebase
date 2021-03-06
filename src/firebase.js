import firebase from 'firebase/app'
import 'firebase/firestore';
import config from './config'

firebase.initializeApp(config.firebase)

const firestore = firebase.firestore()

firestore.settings({
  timestampsInSnapshots: true,
})

firestore.enablePersistence()
  .catch(function(err) {
    console.log(err)
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
    // TODO: Show warnings
  });

export const db = firestore
