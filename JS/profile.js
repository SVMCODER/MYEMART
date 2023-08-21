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

// Assume you have Firebase authentication and Firestore initialized
const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in, fetch user data and update profile form
    const profilePicture = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const profileUpdateForm = document.getElementById('profile-update-form');

    // Update user profile information
    profilePicture.src = user.photoURL || 'https://wallpapers.com/images/hd/cool-pictures-fz4qiypiy3ob4vix.jpg';
    userName.textContent = user.displayName || '';
    userEmail.textContent = user.email || '';

    // Update profile information on form submission
    profileUpdateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const shippingAddress = document.getElementById('shipping-address').value;
      const email = document.getElementById('email').value;
      const phoneNumber = document.getElementById('phone-number').value;
      const zip = document.getElementById('zip-code').value;
      const city = document.getElementById('city').value;
      const state = document.getElementById('state').value;
      const username = document.getElementById('username').value;
      
      try {
        await db.collection("shippingAddresses").doc(user.uid).set({
          shippingAddress,
          email,
          phoneNumber,
          zip,
          city,
          state,
          username
        });
        Swal.fire({
          icon: "success",
          title: "Profile UPdated",
          text: "Your profile has been updated successfully.",
        });
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile.');
      }
    });
  }
});
function show() {
  document.getElementById('profile-update-form').innerHTML = `
  <label for="shipping-address">Shipping Address</label>
  <input type="text" id="shipping-address" name="shipping-address" required>
  
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>
  
  <label for="phone-number">Phone Number</label>
  <input type="tel" id="phone-number" name="phone-number" required>
  
  <label for="zip-code">Zip Code</label>
  <input type="text" id="zip-code" name="zip-code" required>
  
  <label for="city">City</label>
  <input type="text" id="city" name="city" required>
  
  <label for="state">State</label>
  <input type="text" id="state" name="state" required>
  
  <label for="username">Username</label>
  <input type="text" id="username" name="username" required>
  
  <button type="submit">Update Profile</button>
  `
}
document.getElementById('btn.').addEventListener('click', show)