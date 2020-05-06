// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAiICWukNVR_U5m-rtB1YUk62urukuG_sE",
  authDomain: "url-sharing-3cecf.firebaseapp.com",
  databaseURL: "https://url-sharing-3cecf.firebaseio.com",
  projectId: "url-sharing-3cecf",
  storageBucket: "url-sharing-3cecf.appspot.com",
  messagingSenderId: "85139787014",
  appId: "1:85139787014:web:4cee05a2400cfcc569a287",
  measurementId: "G-E6PM4E3X38",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Cloud Firestore - It is document db
// collection = [doc1, doc2, doc3, . . . ]
var db = firebase.firestore();
const docRef = db.doc("samples/sandwichData");

const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function () {
  const textToSave = inputTextField.value;
  console.log("I am going to save " + textToSave + " to Firestore");
  docRef
    .set({
      hotDogStatus: textToSave,
    })
    .then(() => {
      console.log("Status saved");
    })
    .catch((error) => {
      console.log("Got an error: ", error);
    });
});

loadButton.addEventListener("click", () => {
  docRef
    .get()
    .then((doc) => {
      if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus;
      }
    })
    .catch((error) => {
      console.log("Got an error: " + error);
    });
});

getRealtimeUpdates = function () {
  docRef.onSnapshot((doc) => {
    if (doc && doc.exists) {
      console.log("Check out this document I recieved: ", doc);
      const myData = doc.data();
      outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus;
    }
  });
};

getRealtimeUpdates();

// https://www.youtube.com/watch?v=2Vf1D-rUMwE#action=share

// Add data
// Create a new collection and a document
// Documents in a collection can contain different sets of information.
// db.collection("users")
//   .add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   })
//   .then(function (docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function (error) {
//     console.log("Error adding document: ", error);
//   });

// // Add a second document with a generated ID.
// db.collection("users")
//   .add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912,
//   })
//   .then(function (docRef) {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch(function (error) {
//     console.error("Error adding document: ", error);
//   });

// // Read data
// db.collection("users")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   });
