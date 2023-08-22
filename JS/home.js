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
const storage = firebase.storage();
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
const slider = document.getElementById('slider');
const slideImage = document.getElementById('slideImage');
const images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg'];
let currentIndex = 0;

function showSlide(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  currentIndex = index;
  slideImage.src = images[currentIndex];
}



function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Automatically switch to the next slide every 3 seconds
setInterval(nextSlide, 4000);

// Initially show the first slide
showSlide(currentIndex);


