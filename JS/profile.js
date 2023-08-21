var firebaseConfig = {
    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
    authDomain: "https://raona0-default-rtdb.firebaseio.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
var database = firebase.database();
// Function to get the user's uid from the URL parameters
function getUserUidFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
  }
  
// Function to display user data
function displayUserData(user) {
  var uid = user.uid;
  var displayName = user.displayName;
  var photoURL = 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png';

  // If uid is provided in the URL, use that uid to fetch user data
  var urlParams = new URLSearchParams(window.location.search);
  var profileUid = urlParams.get('uid');

  if (profileUid) {
    if (profileUid === uid) {
      // If the current user's uid is the same as the provided uid, display the current user's data
      displayUserProfile(uid, displayName, photoURL);
    } else {
      // Fetch the data of the specified user
      fetchUserProfile(profileUid);
    }
  } else {
    // No uid provided, display the current user's data (if logged in)
    if (uid) {
      displayUserProfile(uid, displayName, photoURL);
    } else {
      // User not logged in, redirect to login page
      window.location.href = 'login.html';
    }
  }
}
// Function to fetch and display user profile data
function fetchUserProfile(uid) {
    var usersRef = database.ref('users/' + uid);
  
    usersRef.once('value')
    .then(function (snapshot) {
      var userData = snapshot.val();
      if (userData) {
        displayUserProfile(uid, userData.displayName, userData.photoURL);
      } else {
        console.log('User data not found');
        // Show an error message or redirect to a not found page
      }
    })
    .catch(function (error) {
      console.log('Error fetching user data:', error);
      // Handle the error as needed
    });
  
  }
  // Function to display user profile data and posts
  function displayUserProfile(uid, displayName, photoURL) {
    // Update the HTML elements to display user information
    var displayNameElement = document.getElementById('displayName');
  
    var photoElement = document.getElementById('photo');
    displayNameElement.textContent = displayName;
    photoElement.src = 'https://cdn-icons-png.flaticon.com/512/7153/7153150.png';

  
  }
    


 // Check if the user is signed in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in
      console.log('User signed in:', user.displayName);
      displayUserProfile(user.uid, user.displayName, user.photoURL);
    
    } else {
      // User is signed out or not signed in
      console.log('User signed out or not signed in.');
      // Redirect the user to index.html or login.html
      window.location.href = 'index.html'; // or login.html
    }
  });

