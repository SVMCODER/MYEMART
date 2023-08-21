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

// Function to fetch and display product details
const displayProductDetails = async () => {
  const productDetailsElement = document.getElementById('productDetails');
  productDetailsElement.innerHTML = '';

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('request-id');

  const productDoc = await db.collection('products').doc(productId).get();
  if (productDoc.exists) {
    const product = productDoc.data();

    const productCard = document.createElement('div');
    productCard.className = 'product-details-card';
    productCard.innerHTML = `
      <img class="product-image" src="${product.mainImage}">
      <div class="product-info">
        <h2 class="product-title">${product.name}</h2>
        <div class="product-price">
        <div class='strike'>
        ₹${product.originalPrice}
        </div>
        <div class="product-discount">Discount: ₹${product.discount}</div>
        
        ₹${product.price}</div>
       <button onclick="window.location.replace('buy.html?id=${productId}')">Buy Now</button>
        <div class="product-specs">
          <h3>Specifications:</h3>
          <ul>
            <li>${product.spec1}</li>
            <li>${product.spec2}</li>
            <li>${product.spec3}</li>
            <li>${product.spec4}</li>
          </ul>
        </div>
        <div class="product-details-content">
          <h3>Product Details:</h3>
          <ul>
            <li>${product.detail1}</li>
            <li>${product.detail2}</li>
            <li>${product.detail3}</li>
            <li>${product.detail4}</li>
            <li>${product.detail5}</li>
          </ul>
        </div>
        <div class='images'>
        <img class="product-image" src="${product.image1}">
        <br>
        <img class="product-image" src="${product.image2}">
        <br>
        <img class="product-image" src="${product.image3}">
        <br>
        <img class="product-image" src="${product.image4}">
        </div>
      </div>
    `;

    productDetailsElement.appendChild(productCard);
  } else {
    productDetailsElement.innerHTML = '<p>Product not found.</p>';
  }
};

// Display product details when the page loads
displayProductDetails();