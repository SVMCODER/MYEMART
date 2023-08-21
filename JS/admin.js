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

  snapshot.forEach(async (doc) => {
    const orderData = doc.data();
    const orderItem = document.createElement("div");
    orderItem.classList.add("order-itemn");
    // Set background color based on order status
    if (orderData.status === "confirmed") {
      orderItem.style.color = "green";
    } else if (orderData.status === "delivered") {
      orderItem.style.color = "blue";
      // Delete order if status is delivered
      await db.collection("orders").doc(doc.id).delete();
      return; // Skip rendering this order item
    } else if (orderData.status === "cancelled") {
      orderItem.style.color = "red";
      // Delete order if status is cancelled
      await db.collection("orders").doc(doc.id).delete();
      return; // Skip rendering this order item
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
      <div align='center'>
        <button class="cancel-button-admin" onclick="cancelOrder('${doc.id}')">Cancel Order</button>
        <button class="mark-delivered-button" onclick="markOrderAsDelivered('${doc.id}')">Mark as Delivered</button>
        <button class="confirm-button-admin" onclick="confirmOrder('${doc.id}')">Confirm Order</button>
         <button class="message-button" onclick="sendMessageToBuyer('${doc.id}', '${orderData.buyerName}', '${orderData.email}')">Send Message</button>
        <button class="delete-button-admin" onclick="deleteOrder('${doc.id}')">Delete Order</button>
      </div>
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

// Function to delete an order
async function deleteOrder(orderId) {
try {
  await db.collection("orders").doc(orderId).delete();
  Swal.fire({
    icon: 'success',
    title: 'Order Deleted',
    text: 'Order has been deleted successfully',
  });
  // Refresh the orders list after deleting an order
  fetchOrders();
} catch (error) {
  console.error("Error deleting order:", error);
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
  const orderDoc = await db.collection("orders").doc(orderId).get();
  const orderData = orderDoc.data();
  const userId = orderData.userId; // Assuming the userId is available in the order data

  Swal.fire({
    title: `Send Message to ${buyerName}`,
    html: `
      <textarea id="message" class="swal2-textarea" rows="4">Thanks for your purchase, it will be delievred soon..</textarea>
      <input type="text" id="imageURL" class="swal2-input" placeholder="Image URL" value="images/logo.png">
      <br>
    `,
    showCancelButton: true,
    confirmButtonText: 'Send',
    cancelButtonText: 'Cancel',
    preConfirm: async () => {
      const message = document.getElementById('message').value;
      const imageURL = document.getElementById('imageURL').value;
      
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();

        // Create a message document in the messages collection
        await db.collection("messages").add({
          userIds: [userId], // Assuming userIds is an array of user IDs
          timestamp,
          message,
          imageURL,
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
  console.error("Error fetching order data:", error);
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

// Function to handle form submission and Firebase upload
const handleFormSubmit = async (formData) => {
  const productName = formData.get('productName');
  const productDesc = formData.get('productDesc');
  const mainImageURL = formData.get('mainImage');

  // Specifications
  const spec1 = formData.get('spec1');
  const spec3 = formData.get('spec3');
  const spec4 = formData.get('spec4');
  const spec2 = formData.get('spec2');
  const wimage1 = formData.get('image1');
  const wimage2 = formData.get('image2');
  const wimage3 = formData.get('image3');
  const wimage4 = formData.get('image4');

  // Product Details
  const detail1 = formData.get('detail1');
  const detail2 = formData.get('detail2');
  const detail3 = formData.get('detail3');
  const detail4 = formData.get('detail4');
  const detail5 = formData.get('detail5');

  // Price
  const price = parseFloat(formData.get('price'));
  const discount = parseFloat(formData.get('discount'));
  const originalPrice = price+discount;

  // Shipping Charges
  const shippingCharges = parseFloat(formData.get('shippingCharges'));

  // Store the product data in Firestore
  const user = auth.currentUser;
  if (user) {
    await db.collection('products').add({
      userId: user.uid,
      name: productName,
      description: productDesc,
      mainImage: mainImageURL,
      spec1,
      spec2,
      spec3,
      spec4,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      price,
      discount,
      originalPrice,
      shippingCharges,
      image1 : wimage1,
      image2 : wimage2,
      image3 : wimage3,
      image4 : wimage4,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Show success message with SweetAlert
    await Swal.fire({
      icon: 'success',
      title: 'Product Uploaded!',
      text: 'Your product has been successfully uploaded.',
    });

    // Clear the form after successful upload
    document.getElementById('productForm').reset();
  } else {
    // Show error message with SweetAlert if user is not authenticated
    await Swal.fire({
      icon: 'error',
      title: 'Authentication Required',
      text: 'You need to sign in to upload products.',
    });
  }
};

// Handle form submission when the "Create Product" button is clicked
const createProductButton = document.getElementById('createProductButton');
createProductButton.addEventListener('click', async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Create Product',
    html: `
      <form id="productForm">
        <label for="productName">Product Name:</label>
        <input type="text" name="productName" id="productName" required>

        <label for="productDesc">Product Description:</label>
        <textarea name="productDesc" id="productDesc" required></textarea>

        <label for="mainImage">Main Image URL:</label>
        <input type="url" name="mainImage" id="mainImage" required>

        <label for="productImages1">Product Image1 URLs (one URL per line):</label>
<input name="image1" id="image1" required>

<label for="productImages2">Product Image2 URLs (one URL per line):</label>
<input name="image2" id="image2" required>

<label for="productImages3">Product Image3 URLs (one URL per line):</label>
<input name="image3" id="image3" required>

<label for="productImages4">Product Image4 URLs (one URL per line):</label>
<input name="image4" id="image4" required>

        <label for="spec1">Specification 1:</label>
        <input type="text" name="spec1" id="spec1" required>

        <label for="spec2">Specification 2:</label>
        <input type="text" name="spec2" id="spec2" required>

        <label for="spec3">Specification 3:</label>
        <input type="text" name="spec3" id="spec3" required>

        <label for="spec4">Specification 4:</label>
        <input type="text" name="spec4" id="spec4" required>

        <label for="detail1">Product Detail 1:</label>
        <input type="text" name="detail1" id="detail1" required>

        <label for="detail2">Product Detail 2:</label>
        <input type="text" name="detail2" id="detail2" required>

        <label for="detail3">Product Detail 3:</label>
        <input type="text" name="detail3" id="detail3" required>

        <label for="detail4">Product Detail 4:</label>
        <input type="text" name="detail4" id="detail4" required>

        <label for="detail5">Product Detail 5:</label>
        <input type="text" name="detail5" id="detail5" required>
        
        <label for="price">Price:</label>
        <input type="number" step="0.01" name="price" id="price" required>

        <label for="discount">Discount:</label>
        <input type="number" step="0.01" name="discount" id="discount" required>

        <label for="shippingCharges">Shipping Charges:</label>
        <input type="number" step="0.01" name="shippingCharges" id="shippingCharges" required>
      </form>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const formData = new FormData(document.getElementById('productForm'));
      return handleFormSubmit(formData);
    },
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Create',
    confirmButtonColor: '#007bff',
  });
});
