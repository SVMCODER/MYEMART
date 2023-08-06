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

// Function to fetch all orders from Firestore
async function fetchOrders() {
  try {
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.get();
    const ordersList = document.getElementById("ordersList");

    snapshot.forEach((doc) => {
      const orderData = doc.data();
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-item");
      orderItem.innerHTML = `
        <p><strong>Order ID:</strong> ${doc.id}</p>
        <p><strong>Product ID:</strong> ${orderData.productId}</p>
        <p><strong>Product Title:</strong> ${orderData.productTitle}</p>
        <p><strong>Price:</strong> ₹${orderData.productPrice}</p>
        <p><strong>Arriving On:</strong> ${orderData.arrivingDate}</p>
        <p><strong>Shipping Address:</strong> ${orderData.shippingAddress}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Phone Number:</strong> ${orderData.phoneNumber}</p>
        <p><strong>Buyer Name:</strong> ${orderData.buyerName}</p>
        <hr>
      `;
      ordersList.appendChild(orderItem);
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    alert("An error occurred while fetching orders. Please try again later.");
  }
}

// Fetch orders and display them when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  await fetchOrders();
});
