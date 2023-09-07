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

  const productsSnapshot = await db.collection('products').get();
  productListElement.innerHTML = ''
  document.getElementById('dh').innerHTML = ''
  productsSnapshot.forEach(doc => {
    // Check if a rating exists in the product document
    
    const product = doc.data();

    const productCard = document.createElement('div');
    let rating = product.rating;

    if (rating === undefined) {
      // If no rating exists, generate a new one
      rating = generateRandomRatingWithStars();
      
      // Update the product document with the new rating
      db.collection('products').doc(doc.id).update({
        rating: rating,
      });
    }
    productCard.className = 'product-card';
    productCard.innerHTML = `
    <img class="product-image" src="${product.mainImage}" onclick="window.location.href = 'item.html?request-id=${doc.id}'">
    <h2 class="product-title" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.name}</h2>
    <div class="product-price" onclick="window.location.href = 'item.html?request-id=${doc.id}'"><div class='op'>${product.discount}</div> ₹${product.price}</div>
    <div class="product-rate" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${rating}</div>
    <div class="product-discount" onclick="window.location.href = 'item.html?request-id=${doc.id}'" > FREE SHIPPING</div>
    <button class="bx bx-cart" onclick="window.location.href = 'item.html?request-id=${doc.id}'"> 𝙱𝚞𝚢</button>
   `;

    productListElement.appendChild(productCard);
   
  });
  
  
};
// Search button click event listener
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', async () => {
  document.getElementById('dsd').innerHTML = '<div class="loading"></div>'
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
        matchedProducts.push(doc);
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
pistElementu = document.getElementById('dsd')
  if (matchedProducts.length === 0) {
    pistElementu.innerHTML = 'No Matching Products Found <br> Explore Porducts <br>'
    displayProducts()
  } else {
    productListElement.innerHTML = '';
    document.getElementById('dsd').innerHTML = ''
    matchedProducts.forEach(doc => {
      const product = doc.data();
      let rating = product.rating;

      if (rating === undefined) {
        // If no rating exists, generate a new one
        rating = generateRandomRatingWithStars();
        
        // Update the product document with the new rating
        db.collection('products').doc(product.id).update({
          rating: rating,
        });
      }
      const productCard = document.createElement('div');
      pistElementu.innerHTML = `Found ${matchedProducts.length} Result(s)`
      productCard.className = 'ssw product-card'; // Apply the .ssw class
      productCard.innerHTML = `
      <img class="product-image" src="${product.mainImage}" onclick="window.location.href = 'item.html?request-id=${doc.id}'">
      <h2 class="product-title" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.name}</h2>
      <div class="product-price" onclick="window.location.href = 'item.html?request-id=${doc.id}'"><div class='op'>${product.discount}</div> ₹${product.price}</div>
      <div class="product-rate" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${rating}</div>
      <div class="product-discount" onclick="window.location.href = 'item.html?request-id=${doc.id}'" > FREE SHIPPING</div>
      <button class="bx bx-cart" onclick="window.location.href = 'item.html?request-id=${doc.id}'"> 𝙱𝚞𝚢</button>
     `;

      productListElement.appendChild(productCard);
      
    });
  }
};
// Your generateRandomRatingWithStars function remains the same as before
function generateRandomRatingWithStars() {
  const minRating = 4;
  const maxRating = 5;
  const integerPart = Math.floor(Math.random() * (maxRating - minRating)) + minRating;
  const decimalPart = Math.floor(Math.random() * 10); // Generates a number between 0 and 9 for tenths of a star
  const stars = "★".repeat(integerPart); // Repeat the star character based on the integer part
  const rating = `${stars} ${integerPart}.${decimalPart}`;
  return rating;
}
document.addEventListener('DOMContentLoaded', displayProducts())