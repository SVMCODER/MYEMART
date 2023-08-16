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
    productDetailsElement.innerHTML = '';

    try {
      const productDoc = await db.collection('products').doc(productId).get();
      if (productDoc.exists) {
        const product = productDoc.data();

        const productCard = document.createElement('div');
        productCard.className = 'product-details-card';
        productCard.innerHTML = `
          <img class="product-image" src="${product.mainImage}">
          <div class="product-info">
            <h2 class="product-title">${product.name}</h2>
            <h4 class="strike">Original Price: ₹${product.price + product.discount}</h4>
            <h4 class="product-discount">Discount: ₹${product.discount}</h4>
            <div class="product-price">Price: ₹${product.price}</div>
            <div class="product-shipping-charges">Shipping Charges: ₹${product.shippingCharges}</div>
          <div class="shipping-form" style="color: black;">
      <h2>Shipping Information</h2>
      <form id="shippingForm">
        <input type="text" id="buyerName" placeholder="Full Name*" required>
        <textarea id="shippingAddress" placeholder="Shipping Address*" required></textarea>
        <input type="number" id="phoneNumber" placeholder="Phone Number*" required>
        <input type="email" id="email" placeholder="Email Address*" required>

        <button type="button" id="buy-button" onclick='buy()'>Buy Now</button>
      </form>
    </div>
    </div>
        `;

        productDetailsElement.appendChild(productCard);
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
    const shippingAddress = document.getElementById("shippingAddress").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const buyerName = document.getElementById("buyerName").value;
    document.getElementById('buy-button').disabled = true;
    if (shippingAddress !== "" && phoneNumber !== "" && email !== "" && buyerName !== "") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");
  
        const productDoc = await db.collection("products").doc(productId).get();
        const product = productDoc.data();
  
        const user = firebase.auth().currentUser;
        const userId = user.uid;
  
        const order = {
          userId: userId, // Associate the order with the user
          productId: productId,
          productTitle: product.name,
          shippingAddress: shippingAddress,
          phoneNumber: phoneNumber,
          email: email,
          buyerName: buyerName,
          productPrice: product.price,
          arrivingDate: calculateArrivingDate(),
          mainImage: product.mainImage,
          status: "confirmed",
        };
  
        await db.collection("orders").add(order);
  
        await Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been placed successfully.",
        });
  
        window.location.href = "completed.html";
      } catch (error) {
        console.error("Error placing order:", error);
        document.getElementById('buy-button').disabled = false;
        await Swal.fire({
          icon: "error",
          title: "Error Placing Order",
          text: "An error occurred while placing your order. Please try again later.",
        });
      }
    } else {
      document.getElementById('buy-button').disabled = false;
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all the required fields to place your order.",
      });
    }
  }
  