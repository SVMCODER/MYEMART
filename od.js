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
// Format a JavaScript Date object to a readable string
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
// Function to fetch all orders for the current user from Firestore
async function fetchMyOrders(user) {
  try {
    const userId = firebase.auth().currentUser.uid;
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.where("userId", "==", userId).get();

    const orders = [];
    snapshot.forEach((doc) => {
      const orderData = doc.data();
      const order = {
        ...orderData,
        id: doc.id,
      };

      if (order.createdAt) {
        order.createdAt = order.createdAt.toDate();
      }

      if (order.deliveredDate) {
        order.deliveredDate = order.deliveredDate.toDate();
      }

      orders.push(order);
    });

    // Sort orders by createdAt in descending order
    orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    const ordersList = document.getElementById("ordersList");

    // Clear existing ordersList content
    ordersList.innerHTML = "";

    orders.forEach((orderData) => {
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

      const orderStatus = document.createElement("p");
      orderStatus.classList.add("order-item-status");

      if (orderData.status === "cancelled") {
        // Handle cancelled status
        orderStatus.textContent = "Cancelled";
        orderStatus.classList.add("cancelled-status");
      } else if (orderData.status === "delivered") {
        // Handle delivered status
        orderStatus.textContent = "Delivered";
        orderStatus.classList.add("delivered-status");
      } else if (orderData.status === "confirmed") {
        // Handle confirmed status
        orderStatus.textContent = "Arriving on: " + orderData.arrivingDate;
        orderStatus.classList.add("arriving-status");

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("cancel-button");
        cancelButton.textContent = "Cancel Order";
        cancelButton.addEventListener("click", async () => {
          await cancelOrder(orderData.id); // Implement the cancelOrder function
          fetchMyOrders(user); // Refresh orders after cancellation
        });
        orderItemContent.appendChild(cancelButton);
      }

      orderItemContent.appendChild(orderStatus);
      orderItem.appendChild(orderItemContent);
      ordersList.appendChild(orderItem);
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

// Fetch my orders and display them when the page loads
document.addEventListener("DOMContentLoaded", async () => {
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


  async function cancelOrder(orderId) {
    const confirmCancel = await Swal.fire({
      title: 'Cancel Order',
      text: 'Are you sure you want to cancel this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No'
    });
  
    if (confirmCancel.isConfirmed) {
      // Update the order status to "cancelled"
      await db.collection("orders").doc(orderId).update({ status: "cancelled" });
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Order Cancelled",
        text: "The order has been cancelled."
      });
      // Refresh the orders list
      fetchMyOrders();
    }
  }
  
  // Logout function
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
  