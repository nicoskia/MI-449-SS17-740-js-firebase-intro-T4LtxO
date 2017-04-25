// TODO Sign into the database anonymously
// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA9OZokWKsyvc0hB6tdC9e8UGowoP58xuQ',
  authDomain: 'woofer-187e3.firebaseapp.com',
  databaseURL: 'https://woofer-187e3.firebaseio.com',
  projectId: 'woofer-187e3',
  storageBucket: 'woofer-187e3.appspot.com',
  messagingSenderId: '464316427048'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  firebase.database().ref('woofs').push(
    woof
  )
}
// READ from Firebase when woofs are added, changed, or removed
// Call addWoofRow, updateWoofRow, and deleteWoofRow to update the page
function readWoofsInDatabase () {
  firebase.database().ref('woofs')
    .on('child_added', function (addSnap) {
      addWoofRow(addSnap.key, addSnap.val())
    })
  firebase.database().ref('woofs')
    .on('child_changed', function (updateSnap) {
      updateWoofRow(updateSnap.key, updateSnap.val())
    })
  firebase.database().ref('woofs')
    .on('child_removed', function (deleteSnap) {
      deleteWoofRow(deleteSnap.key, deleteSnap.val())
    })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs/' + woofKey + '/text').set(
    woofText
  )
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs/' + woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
