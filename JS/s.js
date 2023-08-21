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
  const auth = firebase.auth();
  
  // Function to fetch and display products
  const displayProducts = async () => {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '';
  
    const productsSnapshot = await db.collection('products').get();
    productsSnapshot.forEach(doc => {
      const product = doc.data();
  
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img class="product-image" src="${product.mainImage}" onclick="window.location.replace('item.html?request-id=${doc.id}')">
        <h2 class="product-title" onclick="window.location.replace('item.html?request-id=${doc.id}')">${product.name}</h2>
        <div class="product-price" onclick="window.location.replace('item.html?request-id=${doc.id}')">₹${product.price}</div>
        <div class="product-discount" onclick="window.location.replace('item.html?request-id=${doc.id}')">FREE SHIPPING</div>
        <button class="buy-now-btn" onclick="window.location.replace('item.html?request-id=${doc.id}')">Buy Now</button>
      `;
  
      productListElement.appendChild(productCard);
    });
  };
  
  // Display products when the page loads
  displayProducts();
  
  // Search button click event listener
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  if (searchInput === '') {
    return; // Do nothing if search input is empty
  }

  const searchKeywords = searchInput.split(' '); // Split search input into keywords

  try {
    const productsSnapshot = await db.collection('products').get();
    const matchedProducts = [];
    
    productsSnapshot.forEach(doc => {
      const product = doc.data();
      const productTitleWords = product.name.toLowerCase().split(' '); // Split product title into words
      
      // Check if any of the search keywords match any word from the product title
      if (searchKeywords.some(keyword => productTitleWords.includes(keyword))) {
        matchedProducts.push(product);
      }
    });

    displayMatchedProducts(matchedProducts);
  } catch (error) {
    console.error('Error searching products:', error);
  }
});
  // Function to display matched products
  const displayMatchedProducts = (matchedProducts) => {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '';
  
    if (matchedProducts.length === 0) {
      const noProductsMessage = document.createElement('p');
      noProductsMessage.textContent = 'No matching products found.';
      productListElement.appendChild(noProductsMessage);
    } else {
      matchedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <img class="product-image" src="${product.mainImage}" onclick="window.location.replace('item.html?request-id=${product.id}')">
          <h2 class="product-title" onclick="window.location.replace('item.html?request-id=${product.id}')">${product.name}</h2>
          <div class="product-price" onclick="window.location.replace('item.html?request-id=${product.id}')">₹${product.price}</div>
          <div class="product-discount" onclick="window.location.replace('item.html?request-id=${product.id}')">FREE SHIPPING</div>
          <button class="buy-now-btn" onclick="window.location.replace('item.html?request-id=${product.id}')">Buy Now</button>
        `;
  
        productListElement.appendChild(productCard);
      });
    }
  };