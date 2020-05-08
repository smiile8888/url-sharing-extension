importScrpts("https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js");
importScrpts("https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js");

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

const msg = firebase.messaging();
msg.setBackgroundMessageHandler((payload) => {
  const title = "Hello World";
  const options = {
    body: payload.data.status,
  };
  return self.registration.showNotification(title, options);
});
