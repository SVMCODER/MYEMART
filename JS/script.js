var firebaseConfig = {
  apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
  authDomain: "https://raona0-default-rtdb.firebaseio.com",
  projectId: "raona0",
  storageBucket: "raona0.appspot.com",
  messagingSenderId: "797719983777",
  appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
};
firebase.initializeApp(firebaseConfig);
// Initialize Firebase with your Firebase config

// Function to check if a username already exists in the database
async function checkUsernameExists(username) {
  const snapshot = await firebase.database().ref("usernames").child(username).once("value");
  return snapshot.exists();
}

// Function to handle Google login
async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const userCredential = await firebase.auth().signInWithPopup(provider);
    // User is signed in
    const user = userCredential.user;
    
    // Check if the user has a username in the Firebase database
    const usernameSnapshot = await firebase.database().ref("usernames").child(user.displayName).once("value");
    if (!usernameSnapshot.exists()) {
      // If the username doesn't exist, prompt the user to set one
      const { value: username } = await Swal.fire({
        title: "Create account",
        text: "Enter your username",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Done",
        showLoaderOnConfirm: true,
        preConfirm: async (username) => {
          // Check if the username already exists
          const exists = await checkUsernameExists(username);
          if (exists) {
            Swal.showValidationMessage("Username not available");
            return false;
          }

          try {
            // Update the user's display name with the chosen username
            await user.updateProfile({
              displayName: username
            });

            // Store the username in the Firebase database for future checks
            await firebase.database().ref("usernames").child(username).set(true);

            return username;
          } catch (error) {
            console.error("Username update error:", error);
            Swal.showValidationMessage(`Username Update Error`);
            return false;
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (username) {
        Swal.fire({
          icon: "success",
          title: "Logged In!",
          text: "Please wait..."
        });
        window.location.href = "home.html";
      }
    } else {
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "Please wait..."
      });
      window.location.href = "home.html";
    }
  } catch (error) {
    console.error("Google login error:", error);
    Swal.fire({
      icon: "error",
      title: "Login Error",
      text: "Google Login Error: " + error.message
    });
  }
}
