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
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const displayProductDetails = async () => {
const productDetailsElement = document.getElementById('productDetails');
productDetailsElement.innerHTML = '<div class="loading"></div>'; // Show loading spinner

try {
  const productDoc = await db.collection('products').doc(productId).get();
  if (productDoc.exists) {
    const product = productDoc.data();
    productDetailsElement.innerHTML = '';

  
    const productCard = document.createElement('div');
    productCard.className = 'product-details-card';
    productCard.innerHTML = `
      <img class="product-image" src="${product.mainImage}">
      <hr>
      <div class="product-info">
        <h2 class="product-title">${product.name}</h2>
        <table>
  <tr>
    <th>Original Price</th>
    <td>₹${product.price + product.discount}</td>
  </tr>
  <tr>
    <th>Discount</th>
    <td>₹${product.discount}</td>
  </tr>
  <tr>
    <th>Price</th>
    <td>₹${product.price}</td>
  </tr>
  <tr>
    <th>Shipping Charges</th>
    <td>FREE*</td>
  </tr>
</table>
        <div class="shipping-form" style="color: black;">
          
          <span id="shippingForm">
          <h2>Shipping Information</h2>
            <input type="text" id="buyerName" placeholder="Full Name*" required>
            <textarea id="shippingAddress" placeholder="Shipping Address*" required></textarea>
            <input type="number" id="phoneNumber" placeholder="Phone Number*" required>
            <input type="email" id="email" placeholder="Email Address*" required>
            <button class='bx bx-refresh' id='sae' onclick='window.location.href ="profile.html"'> Change Information</button>
         
          </span>

          <hr>
          <h2>Payment Method</h2><br>
          <div class="radio-container c" id='c'>
          <input type="radio" class="radio-button" id="radio1" name="radioGroup" checked>
          <label for="radio1" class="radio-label">
            <i class='fas fa-shipping-fast'></i> Cash On Delivery
          </label>
          </div>
        
        <div class="radio-container">
          <input type="radio" class="radio-button" id="radio2" name="radioGroup" disabled>
          <label for="radio2" class="radio-label">
            <i class='bx bx-wifi icon'></i> Online Payment
          </label>
        </div>
          

        </div>
        <button type="button" id="buy-button" class='bx bx-cart' onclick='buy()'> 𝙱𝚞𝚢</button>
      </div>
    `;

    productDetailsElement.appendChild(productCard);

    const user = firebase.auth().currentUser;
const userId = user.uid;
const userDoc = await db.collection("shippingAddresses").doc(userId).get();

if (userDoc.exists) {
const userData = userDoc.data();

if (userData.shippingAddress) {
  // User has a saved shipping address
  document.getElementById("shippingForm").style.display = "none";
  document.getElementById("shippingAddress").value = userData.shippingAddress;
} else {
  // User does not have a saved shipping address
  document.getElementById("shippingForm").style.display = "block";
}
} else {
// User document does not exist, handle accordingly
console.log("User document not found");
document.getElementById("shippingForm").style.display = "block";
}

  } else {
    productDetailsElement.innerHTML = '<p>Product not found.</p>';
  }
} catch (error) {
  console.error('Error fetching product details:', error);
  productDetailsElement.innerHTML = '<p>Error fetching product details.</p>';
}
};

// Display product details when the page loads
displayProductDetails();

function calculateArrivingDate() {
  // Add your logic to calculate the arriving date here
  // For example, you can add a few days to the current date
  const today = new Date();
  const arrivingDate = new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000); // Add 3 days to the current date
  return arrivingDate.toDateString();
}
async function buy() {
  const shippingForm = document.getElementById("shippingForm");
  const buyerName = document.getElementById("buyerName").value;
  document.getElementById('buy-button').disabled = true;
  document.getElementById('buy-button').innerHTML = ' Wait...';

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const productDoc = await db.collection("products").doc(productId).get();
    const product = productDoc.data();

    const user = firebase.auth().currentUser;
    const userId = user.uid;
    let shippingAddress, phoneNumber, email;

    // Check if the shipping form fields are visible
    if (shippingForm.style.display === "block") {
      // Form fields are visible, perform validation
      shippingAddress = document.getElementById("shippingAddress").value;
      phoneNumber = document.getElementById("phoneNumber").value;
      email = document.getElementById("email").value;

      if (shippingAddress === "" || phoneNumber === "" || email === "" || buyerName === "") {
        document.getElementById('buy-button').disabled = false;
        document.getElementById('buy-button').innerHTML = ' Buy';
        Swal.fire({
          icon: "error",
          title: "Missing Information",
          text: "Please fill in all the required fields to place your order.",
        });
        return; // Exit the function without proceeding further
      }

      // Save the shipping data for the user
      await db.collection("shippingAddresses").doc(userId).set({
        shippingAddress: shippingAddress,
        phoneNumber: phoneNumber,
        email: email,
      });
      document.getElementById('sae').style.visibility = 'none'
    } else {
      // Retrieve the saved shipping data for the user
      const userDoc = await db.collection("shippingAddresses").doc(userId).get();
      const userData = userDoc.data();
      if (userData) {
        shippingAddress = userData.shippingAddress;
        phoneNumber = userData.phoneNumber;
        email = userData.email;
      } else {
        // Saved shipping data not found
        document.getElementById('buy-button').disabled = false;
        document.getElementById('buy-button').innerHTML = ' Buy';
        Swal.fire({
          icon: "error",
          title: "Shipping Data Not Found",
          text: "Please provide your shipping information to place the order.",
        });
        return; // Exit the function without proceeding further
      }
    }
// Function to generate a random ID in the form "1111-2222-3333-4444"
function generateRandomId() {
  const sections = [];
  for (let i = 0; i < 4; i++) {
    const section = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    sections.push(section);
  }
  return sections.join('-');
}
if (product.productCategory == 'cloth' || product.productCategory == 'footwear') {
 a = localStorage.getItem('selectedSize')
}
else {
  a='None'
}
    const order = {
      userId: userId, // Associate the order with the user
      productId: productId,
      productTitle: product.name,
      shippingAddress: shippingAddress,
      phoneNumber: phoneNumber,
      email: email,
      buyerName: user.displayName,
      productPrice: product.price,
      arrivingDate: calculateArrivingDate(),
      mainImage: product.mainImage,
      status: "confirmed",
      categroy: product.productCategory,
      a,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Add a timestamp field with the current server time
    };
    
    const orderId = generateRandomId(); // Generate a random order ID
    const orderRef = db.collection("orders").doc(orderId);
orderRef.set(order)

    await Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: "Your order has been placed successfully.",
    });
    document.getElementById('buy-button').disabled = true;
    document.getElementById('buy-button').innerHTML = ' Thank You!';
    window.location.replace('completed.html')
  } catch (error) {
    console.error("Error placing order:", error);
    document.getElementById('buy-button').disabled = false;
    document.getElementById('buy-button').innerHTML = ' Buy';
    await Swal.fire({
      icon: "error",
      title: "Error Placing Order",
      text: "An error occurred while placing your order. Please try again later.",
    });
  }
}


{/* <li>
            <input type="radio" id="s-option" name="selector">
            <label for="s-option">Bacon</label>
            
            <div class="check"><div class="inside"></div></div>
          </li> */}