var firebaseConfig = {
  apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
  authDomain: "https://raona0-default-rtdb.firebaseio.com",
  projectId: "raona0",
  storageBucket: "raona0.appspot.com",
  messagingSenderId: "797719983777",
  appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database()
var auth = firebase.auth()
async function checkUsernameExists(username) {
    const snapshot = await firebase.database().ref("usernames").child(username).once("value");
    return snapshot.exists();
  }
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    // Regular expression for email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address."
      });
      return;
    }
  
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      // User is signed in
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "Please wait..."
      });
      window.location.href = "home.html";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Login error:", errorCode, errorMessage);
  
      if (errorCode === "auth/user-not-found") {
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
              const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
              const user = userCredential.user;
              await user.updateProfile({
                displayName: username
              });
  
              // Store the username in the Firebase database for future checks
              await firebase.database().ref("usernames").child(username).set(true);
  
              return username;
            } catch (error) {
              console.error("Sign up error:", error);
              Swal.showValidationMessage(`Sign up Error`);
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
          icon: "error",
          title: "Login Error",
          text: errorMessage
        });
      }
    }
  }
  