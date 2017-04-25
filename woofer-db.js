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

var curDate = new Date().getTime()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  var newWoof = document.getElementById('woof-text').value
  firebase.database().ref('woofs').push({
    created_at: curDate,
    text: newWoof
  })
}
// READ from Firebase when woofs are added, changed, or removed
// Call addWoofRow, updateWoofRow, and deleteWoofRow to update the page
function readWoofsInDatabase () {
  firebase.database().ref('woofs')
    .on('child_added', function (addSnap) {
      addWoofRow(addSnap.key, addSnap.val())
      addWoofRow(addSnap.created_at)
      addWoofRow(addSnap.text)
    })
  firebase.database().ref('woofs')
    .on('child_changed', function (updateSnap) {
      updateWoofRow(updateSnap.key, updateSnap.val())
      updateWoofRow(updateSnap.created_at)
      updateWoofRow(updateSnap.text)
    })
  firebase.database().ref('woofs')
    .on('child_removed', function (deleteSnap) {
      deleteWoofRow(deleteSnap.key, deleteSnap.val())
      deleteWoofRow(deleteSnap.created_at)
      deleteWoofRow(deleteSnap.text)
    })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs/' + woofKey).set({
    created_at: curDate,
    text: woofText
  })
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs/' + woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
