var firebaseConfig = {
    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
    authDomain: "https://raona0-default-rtdb.firebaseio.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
  };
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  // Function to fetch all orders for the current user from Firestore
  async function fetchMyOrders(user) {
    const userId = firebase.auth().currentUser.uid;
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.where("userId", "==", userId).get();
    const ordersList = document.getElementById("ordersList");
  
    // Clear existing ordersList content
    ordersList.innerHTML = "";
  
    snapshot.forEach((doc) => {
      const orderData = doc.data();
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
  
      const mainImage = document.createElement("img");
      mainImage.src = orderData.mainImage;
      mainImage.alt = orderData.productTitle;
      orderItem.appendChild(mainImage);
  
      const orderItemContent = document.createElement("div");
      orderItemContent.classList.add("order-item-content");
  
      const orderItemTitle = document.createElement("div");
      orderItemTitle.classList.add("order-item-title");
      orderItemTitle.textContent = orderData.productTitle;
      orderItemContent.appendChild(orderItemTitle);
  
      const orderItemArrivingDate = document.createElement("h4");
      orderItemArrivingDate.classList.add("order-item-arriving-date");
      orderItemArrivingDate.textContent = "Arriving on: " + orderData.arrivingDate;
      orderItemContent.appendChild(orderItemArrivingDate);
  
      orderItem.appendChild(orderItemContent);
  
      ordersList.appendChild(orderItem);
    });
  }
  
  // Fetch my orders and display them when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    // Handle Firebase Authentication state change
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated:", user);
        fetchMyOrders(user);
      } else {
        console.error("User not authenticated.");
      }
    });
  });
  

// Updated logout function with confirmation
function logout() {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Log out',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        firebase.auth().signOut()
          .then(() => {
            console.log("User logged out");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "User logged out successfully!"
            });
            window.location.href = "login.html"; // Redirect the user to the login page after logout
          })
          .catch((error) => {
            console.error("Logout error:", error);
            Swal.fire({
              icon: "error",
              title: "Logout Error",
              text: "An error occurred while logging out."
            });
          });
      }
    });
  }
