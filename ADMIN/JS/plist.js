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
const displayProducts = async () => {
  const productListElement = document.getElementById('productList');
  document.getElementById('dh').innerHTML = '<div class="loading"></div>'

  const productsSnapshot = await db.collection('products').get();
  productListElement.innerHTML = ''
  document.getElementById('dh').innerHTML = ''
  
  productsSnapshot.forEach(async (doc) => {
    const product = doc.data();
    
    // Check if a rating exists in the product document
    let rating = product.rating;

    if (rating === undefined) {
      // If no rating exists, generate a new one
      rating = generateRandomRatingWithStars();
      
      // Update the product document with the new rating
      await db.collection('products').doc(doc.id).update({
        rating: rating,
      });
    }
document.getElementById('plaxs').innerHTML = `Products (${productsSnapshot.size})`
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
    
      <img class="product-image" src="${product.mainImage}">
      <div class='det'>
      <h2 class="product-title">${product.name}</h2>
      <div class="product-price"><div class='op'>₹${product.originalPrice}</div> ₹${product.price}</div>
      <div class="product-rate">${rating}</div>
      <div class="product-discount" > FREE SHIPPING</div>
      <button class="bx bx-trash" onclick="deleteProduct('${doc.id}')" style="background-color: red;color:white;"> Delete</button>
    
      <button class="bx bx-edit" onclick="window.location.href = 'edit.html?p=${doc.id}'"> Modify</button>
    
      </div>
      `;
    
    productListElement.appendChild(productCard);
  });
}
// Function to delete a product
const deleteProduct = async (productId) => {
    // Display a confirmation dialog using SweetAlert
    const confirmation = await Swal.fire({
        title: 'Delete Product',
        text: 'Are you sure you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    });

    // Check if the user confirmed the deletion
    if (confirmation.isConfirmed) {
        try {
            // Delete the product document from Firestore
            await db.collection('products').doc(productId).delete();

            // Show a success message using SweetAlert
            Swal.fire('Deleted!', 'The product has been deleted.', 'success')
                // Redirect to a different page or reload the current page as needed
                displayProducts()
            
        } catch (error) {
            // Handle any errors that occur during deletion
            console.error('Error deleting product:', error);

            // Show an error message using SweetAlert
            Swal.fire('Error', 'An error occurred while deleting the product.', 'error');
        }
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



const database = firebase.database();

const leaderboardContainer = document.getElementById('leaderboard');

async function getUserProductCounts() {
const querySnapshot = await db.collection('products').get();
const productCounts = {};

querySnapshot.forEach(doc => {
const data = doc.data();
const userId = data.userId;

if (productCounts[userId]) {
    productCounts[userId]++;
} else {
    productCounts[userId] = 1;
}
});

// Convert productCounts to an array
const leaderboardArray = Object.entries(productCounts);

// Sort the array in descending order
leaderboardArray.sort((a, b) => b[1] - a[1]);

return leaderboardArray;
}

function generateLeaderboardHTML(leaderboardData) {
let totalProducts = 0; // Initialize the total products counter

let html = '<h2>Leaderboard</h2><ol>';

leaderboardData.forEach(([userId, count], index) => {
const username = userId;
html += `<li>${username.replace('Q1H1gMgRbPWfXBa94KUmJ4kFR352','Aishwary Pandey').replace('Wt17TEcOg2f7gIK29Dd2f0S96zC3','Ansh Vishwakarma').replace('tgT5Y0Qd3lMx5ztwwUwQPf1JLXz1','Shaurya Tripathi').replace('PxycmPjNYTVBGC1msjC0N8N72Nx2','Ayush Pyush').replace('snZq2ZD1csX9c95Wst5RLV8j9kC2','Aviral Tripathi').replace('JnsksoWKMfWJyoRcZyceuDcebWq2','Aakash Yadav').replace('sFlYpUuRpddeizrvi3zYmB6jDSm1','Chaman Sharma').replace('vJvt1VqoNFgXxbfwtTRUrVXLnRC2','Shikhar Srivastava')} - ${count} products</li>`;
totalProducts += count; // Add to the total products counter
});

html += '</ol>';

const percentage = ((totalProducts / 1000) * 100).toFixed(2); // Calculate the percentage

return html + `
<p>TOTAL: ${totalProducts}/1000 PRODUCTS (${percentage}%)</p>
`;
}


async function displayLeaderboard() {
try {
const leaderboardData = await getUserProductCounts();

leaderboardContainer.innerHTML = generateLeaderboardHTML(leaderboardData)+`

`;
} catch (error) {
console.error("Error in displayLeaderboard:", error);
}
}


displayLeaderboard()