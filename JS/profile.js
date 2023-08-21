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

const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(async user => {
  if (user) {
    // User is signed in

    // Fetch user data and update profile form
    const profilePicture = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    
    // Update user profile information
    profilePicture.src = user.photoURL || 'https://wallpapers.com/images/hd/cool-pictures-fz4qiypiy3ob4vix.jpg';
    userName.textContent = user.displayName || '';
    userEmail.textContent = user.email || '';

  } else {
    // User is not signed in
    console.log("User is not signed in");
  }
});
