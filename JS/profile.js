var firebaseConfig = {
  apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
  authDomain: "https://raona0-default-rtdb.firebaseio.com",
  projectId: "raona0",
  databaseURL: "https://raona0-default-rtdb.firebaseio.com",
  storageBucket: "raona0.appspot.com",
  messagingSenderId: "797719983777",
  appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(async user => {
  if (user) {
    const userId = user.uid;
    let phoneNumber = '';
    let email = '';
    const phoneNumberElement = document.getElementById('phone-number');
    const emailElement = document.getElementById('email');
    const shippingAddressElement = document.getElementById('shipping-address');

    const profilePicture = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const shippingAddress = document.getElementById('shipping-address');

    profilePicture.src = user.photoURL || 'https://wallpapers.com/images/hd/cool-pictures-fz4qiypiy3ob4vix.jpg';
    userName.textContent = user.displayName || '';
    userEmail.textContent = user.email || '';

    // Display the shipping address
    const userDocRef = db.collection("shippingAddresses").doc(userId);
    try {
      const userDoc = await userDocRef.get();
      if (userDoc.exists && userDoc.data().shippingAddress) {
        shippingAddressElement.textContent = userDoc.data().shippingAddress;
      } else {
        shippingAddressElement.textContent = "No shipping address saved.";
      }
    } catch (error) {
      console.error("Error fetching shipping address:", error);
    }


    async function updateUserProfile(userId, displayName, photoURL) {
      profilePicture.src = user.photoURL || 'https://wallpapers.com/images/hd/cool-pictures-fz4qiypiy3ob4vix.jpg';
      userName.textContent = user.displayName || '';
      userEmail.textContent = user.email || '';
    }
      
      
    document.getElementById("editProfileBtn").addEventListener("click", async () => {
      const { value: formValues } = await Swal.fire({
        title: "Edit Profile",
        html:
          `<input id="swal-newName" class="swal2-input" placeholder="New Name" value="${user.displayName || ''}" minlength="3" maxlength="16"> <br>` +
          `<label for="swal-newPhoto" class="swal2-file-label bx bx-plus"> Profile Picture<input type="file" id="swal-newPhoto" class="swal2-file" style="display:none;"></label>`, // Replace "Icon Here" with your icon
    
        focusConfirm: false,
        preConfirm: () => {
          const newNameInput = document.getElementById("swal-newName");
          const newPhotoInput = document.getElementById("swal-newPhoto");
    
          const newName = newNameInput.value.trim();
          const newPhoto = newPhotoInput.files[0];
    
          if (newName.length < 3 || newName.length > 16) {
            Swal.showValidationMessage("Username must be between 3 and 16 characters");
            return false;
          }
    
          return {
            newName,
            newPhoto,
          };
        },
      });
    
      if (formValues) {
        const { newName, newPhoto } = formValues;
    
        Swal.fire({
          title: "Updating Profile...",
          allowOutsideClick: false,
          didOpen: async () => {
            Swal.showLoading();
    
            try {
              if (newPhoto) {
                const storageRef = firebase.storage().ref();
                const photoRef = storageRef.child(`profile-photos/${userId}`);
                const uploadTask = photoRef.put(newPhoto);
    
                const snapshot = await uploadTask;
                const downloadURL = await snapshot.ref.getDownloadURL();
                await user.updateProfile({
                  displayName: newName,
                  photoURL: downloadURL,
                });
    
                updateUserProfile(userId, newName, downloadURL);
                Swal.fire("Success!", "Profile updated successfully!", "success");
              } else {
                await user.updateProfile({
                  displayName: newName,
                });
    
                updateUserProfile(userId, newName, user.photoURL);
                Swal.fire("Success!", "Profile updated successfully!", "success");
              }
            } catch (error) {
              Swal.fire("Error", "An error occurred while updating the profile.", "error");
              console.error("Error updating profile:", error);
            }
          },
        });
      }
    });
    

    try {
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        phoneNumber = userData.phoneNumber || '';
        email = userData.email || '';
        phoneNumberElement.textContent = phoneNumber; // Update phone number element
        emailElement.textContent = email; // Update email element
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    document.getElementById("editShippingBtn").addEventListener("click", async () => {
      const { value: formValue } = await Swal.fire({
        title: "Edit Shipping Address",
        html:
          `<div style="text-align: center;">
            <textarea id="swal-shippingAddress" class="swal2-textarea" placeholder="Enter new shipping address">${shippingAddressElement.textContent}</textarea><br>
            <input id="swal-phoneNumber" class="swal2-input" placeholder="Enter phone number" value="${phoneNumber || ''}"><br>
            <input id="swal-email" class="swal2-input" placeholder="Enter email" value="${email || ''}">
          </div>`,
        focusConfirm: false,
        preConfirm: () => {
          const newShippingAddress = document.getElementById("swal-shippingAddress").value;
          const newPhoneNumber = document.getElementById("swal-phoneNumber").value;
          const newEmail = document.getElementById("swal-email").value;
    
          if (!newShippingAddress.trim() || !newPhoneNumber.trim() || !newEmail.trim()) {
            Swal.showValidationMessage("All fields are required");
            return false;
          }
    
          if (newPhoneNumber.length !== 10 || isNaN(newPhoneNumber)) {
            Swal.showValidationMessage("Phone number must be 10 digits");
            return false;
          }
    
          // You can use regular expressions or other methods to validate the email format
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!newEmail.match(emailPattern)) {
            Swal.showValidationMessage("Invalid email format");
            return false;
          }
    
          return {
            newShippingAddress,
            newPhoneNumber,
            newEmail,
          };
        },
        showCancelButton: true,
        confirmButtonText: "Save",
      });
    
      if (formValue) {
        try {
          // Update shipping address, phone number, and email
          const newShippingAddress = formValue.newShippingAddress;
          const newPhoneNumber = formValue.newPhoneNumber;
          const newEmail = formValue.newEmail;
    
          await db.collection("shippingAddresses").doc(userId).set({
            shippingAddress: newShippingAddress,
            phoneNumber: newPhoneNumber,
            email: newEmail,
          });
    
          // Update the displayed values
          shippingAddressElement.textContent = newShippingAddress;
          phoneNumber = newPhoneNumber;
          email = newEmail;
          phoneNumberElement.textContent = phoneNumber;
          emailElement.textContent = email;
    
          Swal.fire("Success!", "Shipping address updated successfully!", "success");
        } catch (error) {
          Swal.fire("Error", "An error occurred while updating the shipping address.", "error");
          console.error("Error updating shipping address:", error);
        }
      }
    });
    

  } else {
    console.log("User is not signed in");
  }
});
