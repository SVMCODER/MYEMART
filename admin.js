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

// Function to fetch all orders
async function fetchOrders() {
  try {
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.get();
    const ordersList = document.getElementById("oL");
    
    ordersList.innerHTML = ""; // Clear existing content

    snapshot.forEach((doc) => {
      const orderData = doc.data();
      const orderItem = document.createElement("div");
      orderItem.classList.add("order-itemn");
       // Set background color based on order status
       if (orderData.status === "confirmed") {
        orderItem.style.color = "green";
      } else if (orderData.status === "delivered") {
        orderItem.style.color = "blue";
      } else if (orderData.status === "cancelled") {
        orderItem.style.color = "red";
      }
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
        <h3 align='center' id='sta'>${orderData.status}</h3>
        <hr>
        <button class="cancel-button-admin" onclick="cancelOrder('${doc.id}')">Cancel Order</button>
        <button class="mark-delivered-button" onclick="markOrderAsDelivered('${doc.id}')">Mark as Delivered</button>
        <button class="confirm-button-admin" onclick="confirmOrder('${doc.id}')">Confirm Order</button>
        <button class="message-button" onclick="sendMessageToBuyer('${doc.id}', '${orderData.buyerName}', '${orderData.email}')">Send Message</button>
        
      `;
      ordersList.appendChild(orderItem);
      
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    Swal.fire({
      icon: 'error',
      title: 'An error occured!',
      text: 'Try again later',
    });
  }
}

// Fetch orders and display them when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  await fetchOrders();
});

// Function to cancel an order (for admin)
async function cancelOrder(orderId) {
  try {
    await db.collection("orders").doc(orderId).update({
      status: "cancelled",
    });
    Swal.fire({
      icon: 'success',
      title: 'Order Cancelled',
      text: 'Order marked as cancelled',
    });
    // Refresh the orders list after canceling an order
    fetchOrders();
  } catch (error) {
    console.error("Error canceling order:", error);
    Swal.fire({
      icon: 'error',
      title: 'An error occured!',
      text: 'Try again later',
    });
  }
}

// Function to mark an order as delivered (for admin)
async function markOrderAsDelivered(orderId) {
  try {
    await db.collection("orders").doc(orderId).update({
      status: "delivered",
    });
    Swal.fire({
      icon: 'success',
      title: 'Order Delivered',
      text: 'Order marked as delivered',
    });
    // Refresh the orders list after marking an order as delivered
    fetchOrders();
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    Swal.fire({
      icon: 'error',
      title: 'An error occured!',
      text: 'Try again later',
    });
  }
}


// Function to send a message to the buyer (for admin)
async function sendMessageToBuyer(orderId, buyerName, buyerEmail) {
  try {
    const user = firebase.auth().currentUser;

    Swal.fire({
      title: `Send Message to ${buyerName}`,
      input: 'textarea',
      inputLabel: 'Message to Buyer',
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
      preConfirm: async (message) => {
        try {
          // Fetch the order document to get the userId of the buyer
          const orderDoc = await db.collection("orders").doc(orderId).get();
          const orderData = orderDoc.data();
          const userIds = orderData.userId;

          // Create a message document in the messages collection
          const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          await db.collection("messages").add({
            userIds,
            message,
          });

          console.log(`Message sent to ${buyerName} (${buyerEmail}): ${message}`);
          Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'Your message has been sent to the buyer.',
          });
        } catch (error) {
          console.error('Error sending message:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error Sending Message',
            text: 'An error occurred while sending the message.',
          });
        }
      },
    });
  } catch (error) {
    console.error("Error getting current user:", error);
  }
}


async function confirmOrder(orderId) {
  const swalResult = await Swal.fire({
    title: "Confirm Order",
    text: "Are you sure you want to confirm this order?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
  });

  if (swalResult.isConfirmed) {
    try {
      await db.collection("orders").doc(orderId).update({
        status: "confirmed",
      });
      Swal.fire({
        icon: 'success',
        title: 'Order Confirmed',
        text: 'Order marked as confirmed',
      });
      fetchOrders(); // Refresh the orders list after confirming an order
    } catch (error) {
      console.error("Error confirming order:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error Confirming Order',
        text: 'An error occurred',
      });
    }
  }
}
