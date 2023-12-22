function home() {
    document.querySelector('html').innerHTML = `
    <!DOCTYPE html>
<html>

<head>
  <title>ᴛʀᴜʟꜱ</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="CSS/styles.css">
  <link rel="stylesheet" href="CSS/pr.css">
  <script src="https://kit.fontawesome.com/e8f41511df.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <script src="https://kit.fontawesome.com/e8f41511df.js" crossorigin="anonymous"></script>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="tab-nav-container">
    <div class="tab active purple">
      <i class='bx bxs-home'></i>
      <p></p>
    </div>
    <div class="tab" onclick="orders()">
      <i class='bx bx-cart'></i>
      <p></p>
    </div>
    <div class="tab" onclick="hsearch()">
      <i class='bx bx-search'></i>
      <p></p>
    </div>
    <div class="tab" onclick="support()">
      <i class='bx bx-support'></i>
      <p></p>
    </div>
    <div class="tab" onclick="profile()">
      <i class='bx bx-user'></i>
      <p></p>
    </div>
  </div>
  <div class="sass">
    
    <div class="head">
      <h3>ᴛʀᴜʟꜱ</h3>
      
      <h3 class="right">
        <i class="bx bx-bell" onclick="offers()"></i>
        <i class='bx bx-search' onclick="hsearch()"></i>
        <i></i>
        
      </h3>

    </div>
  
    <br><br><br><br>
    <div class="ssw" align="center">
  
      <div id="slider">
        <img src="" class="slide" id="slideImage" />
      </div>
  
  
      
    </div>
    
  </div> <br>
  <div class="dsdsss" align="center">
    <div class="ecn" align="center">
      <h3 align="center" class="bx bxs-heart"> Awesome Services</h3>
    </div>
    <div class="so" align="center"> 
    <div class="tabw">
      <i class="fas fa-shipping-fast"></i>
      <p>Free & Fast Delivery</p>
    </div>
    <div class="tabw">
      <i class="fa-solid fa-piggy-bank"></i>
      <p>Much More Savings</p>
    </div>
    <div class="tabw">
      <i class="fa-solid fa-heart"></i>
      <p>Lowest Price Ever</p>
    </div>
    <div class="tabw">
      <i class="fa-solid fa-percent"></i>
      <p>Massive Discounts</p>
    </div>
  </div>
<div class="ecn" align="center">
  <h3 class="bx bxs-discount" align="center"> Top Sales</h3>
</div>
  <img class="soj" src="https://zz.jumia.is/cms/01_HP_Sliders/2023/1808_MB_Single-Banner-2-730x292-.gif" alt="">
</div>
  <div class="ecn" align="center">
    <h3 align="center" class="bx bxs-hot"> Hot Deals</h3>
  </div>
 
  <div class="container" id="productList" align="center">
  
  </div>
  <div id="dh" align="center"></div>
  <br><br><br><br>


<style>
  .ecn {
    align-items: center;
  }
  .container {
    width: 96%;
  }
  .product-price:nth-child(0) {
    display: flex;
    text-decoration: line-through;
    color: red;
  }
  button {
  width: fit-content;
  border: none;
  padding: 0.6em 1em;
  border-radius: 4px;
  margin: 10px 0;
  box-shadow: 0px 5px 3px -4px #888888;  
  background-color: #ffc400;
  color: #000000;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

button, button::after {
   /*Make sure the animation is over the whole element*/

  -webkit-animation-name: ShineAnimation;
  -webkit-animation-duration: 5s;
  
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(.12,.89,.98,.47);
}

@-webkit-keyframes ShineAnimation{
  from {
      background-repeat:no-repeat;
      background-image:-webkit-linear-gradient(
          top left,
          rgba(255, 255, 255, 0.0) 0%,
          rgba(255, 255, 255, 0.0) 45%,
          rgba(255, 255, 255, 0.5) 48%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0.5) 52%,
          rgba(255, 255, 255, 0.0) 57%,
          rgba(255, 255, 255, 0.0) 100%
      );
      background-position:-250px -250px;
      background-size: 250px 250px
  }
  to {
      background-repeat:no-repeat;
      background-position:250px 250px;
  }
}
#slider {
  border: 3px solid;
  border-image-slice: 1;
  border-width: 2px;
  border-image-source: linear-gradient(to left, #fc01e7, #9a01f3);
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
  width: 98%;
  margin: 0 auto;
  overflow: hidden;
}
.slide {
  width: 100%;
  max-height: 250px;
  min-height: 250px;
}
.slide {
  width: 100%;
  height: auto;
  display: block;
}
.nav-button {
  display: flex;
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  color: white;
  border: none;
  box-shadow: none;
  cursor: pointer;
}

#leftButton {
  left: 0;
}

#rightButton {
  right: 0;
}

#slider:hover .nav-button {
  display: block; 
}
.loading {
  margin-top: 0;
}
.nav-button:hover {
  background-color: transparent;
} 


</style>
 
  <script   src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
 <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
 <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>  
 <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>  
 <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>-->
    <script src="JS/home.js"></script> 
    <script src="JS/nav.js"></script>
</body>

</html>

    `
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



var firebaseConfig = {
  apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
  authDomain: "https://raona0-default-rtdb.firebaseio.com",
  projectId: "raona0",
  storageBucket: "raona0.appspot.com",
  messagingSenderId: "797719983777",
  appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
};
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

    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
    
      <img class="product-image" src="${product.mainImage}" onclick="window.location.href = 'item.html?request-id=${doc.id}'">
      <div class='det'>
      <h2 class="product-title" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.name}</h2>
      <h2 class="product-titlee" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.description}</h2>
      <div class="product-price" onclick="window.location.href = 'item.html?request-id=${doc.id}'"><div class='discd'>${(100*product.price/product.originalPrice-100).toFixed()*-1}%</div> <div class='op'>${product.originalPrice}</div> ₹${product.price}</div>
      <div class="product-rate" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${rating} <div class='imggo'><img src='/images/tic.gif'></div></div>
      <div class="del" onclick="window.location.href = 'item.html?request-id=${doc.id}'">Free Delivery</div>
      

    
      </div>
      `;
    
    productListElement.appendChild(productCard);
  });
}

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




}
function orders() {
    document.querySelector('html').innerHTML = `
    <!DOCTYPE html>
<html>
<head>
  <title>ᴛʀᴜʟꜱ</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="CSS/styles.css">
  <link rel="stylesheet" href="CSS/pr.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.css" />
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
  <div class="tab-nav-container">
    <div class="tab" onclick="home()">
      <i class='bx bx-home'></i>
      <p></p>
    </div>
    <div class="tab active purple">
      <i class='bx bxs-cart'></i>
      <p></p>
    </div>
    <div class="tab" onclick="hsearch()">
      <i class='bx bx-search' ></i>
      <p></p>
    </div>
    <div class="tab" onclick="support()">
      <i class='bx bx-support' ></i>
      <p></p>
    </div>
    <div class="tab" onclick="profile()">
      <i class='bx bx-user' ></i>
      <p></p>
    </div>
  </div>
  <div class="head">
    <h3 class="bx bx-arrow-back" onclick="window.location.replace('home.html')"> My Purchases</h3>
    <h3 class="right">
      <i class="bx bx-bell" onclick="offers()"></i>
<!--      
      <i class='bx bx-log-out' onclick="logout()"></i> -->
      <i></i>
     </h3>
  </div>
  <br><br><br> 
 
  <div id="ssssss" align="center">
    <div id="ordersList"></div>
    <div id="dh"></div>
  </div>
  <script   src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
  <script src="JS/od.js"></script>
  
  <script src="JS/nav.js"></script>
<br><br><br>
<style>
  .container {
  box-shadow: rgba(243, 243, 243, 0.301) 0px 1px 4px;
  width: fit-content;
  height: auto;
  width: 90%;
  padding-bottom: 30px;
  color: rgb(255, 255, 255);
  padding: 0.6em 1em;
}
  /* Style for the loading spinner */
  .loading-spinner {
    align-items: center;
    justify-content: center;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    border-top: 4px solid #0004ff;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  button {
  width: fit-content;
  border: none;
  padding: 0.6em 1em;
  border-radius: 4px;
  margin: 10px 0;
  box-shadow: 0px 5px 3px -4px #a8a8a8;  
  background-color: #ff0000;
  color: #ffffff;
  font-size: 17px;
  cursor: pointer;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }


</style>
</body>
</html>

    `

    
  // Format a JavaScript Date object to a readable string
  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
  // Function to fetch all orders for the current user from Firestore
  async function fetchMyOrders(user) {
    try {
      const userId = firebase.auth().currentUser.uid;
      const ordersRef = db.collection("orders");
      const snapshot = await ordersRef.where("userId", "==", userId).get();
  
      const orders = [];
      snapshot.forEach((doc) => {
        const orderData = doc.data();
        const order = {
          ...orderData,
          id: doc.id,
        };
  
        if (order.createdAt) {
          order.createdAt = order.createdAt.toDate();
        }
  
        if (order.deliveredDate) {
          order.deliveredDate = order.deliveredDate.toDate();
        }
  
        orders.push(order);
      });
  
      // Sort orders by createdAt in descending order
      orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  
      const ordersList = document.getElementById("ordersList");
      ordersList.innerHTML = '<div class="loading"></div>'; // Show loading spinner
    
      // Clear existing ordersList content
      ordersList.innerHTML = "";
      if (orders.length === 0) {
        ordersList.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><br> <h3>☹ No Purchases Yet</h3>'
      } else {
      orders.forEach((orderData) => {
        const orderItem = document.createElement("div");
        orderItem.classList.add("order-item");
  
        const mainImage = document.createElement("img");
        mainImage.src = orderData.mainImage;
        mainImage.alt = orderData.productTitle;
        orderItem.appendChild(mainImage);
  
        const orderItemContent = document.createElement("div");
        orderItemContent.classList.add("order-item-content");
  
        const orderItemTitle = document.createElement("div");
        orderItemTitle.classList.add("order-item-title");
        orderItemTitle.textContent = orderData.productTitle;
        orderItemContent.appendChild(orderItemTitle);
  
        const orderStatus = document.createElement("p");
        orderStatus.classList.add("order-item-status");
  
        if (orderData.status === "cancelled") {
          // Handle cancelled status
          orderStatus.textContent = "Cancelled";
          orderStatus.classList.add("cancelled-status");
        } else if (orderData.status === "delivered") {
          // Handle delivered status
          orderStatus.textContent = "Delivered";
          orderStatus.classList.add("delivered-status");
        } else if (orderData.status === "confirmed") {
          // Handle confirmed status
          orderStatus.textContent = "Arriving on: " + orderData.arrivingDate;
          orderStatus.classList.add("arriving-status");
  
          const cancelButton = document.createElement("button");
          cancelButton.classList.add("cancel-button");
          cancelButton.textContent = "Cancel";
          cancelButton.addEventListener("click", async () => {
            await cancelOrder(orderData.id); // Implement the cancelOrder function
            fetchMyOrders(user); // Refresh orders after cancellation
          });
          orderItemContent.appendChild(orderStatus);
          orderItemContent.appendChild(cancelButton);
        }
  
        
        orderItem.appendChild(orderItemContent);
        ordersList.appendChild(orderItem);
      });
    }
    }
    catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  
  // Fetch my orders and display them when the page loads
  document.addEventListener("DOMContentLoaded", async () => {
    // Handle Firebase Authentication state change
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("User authenticated:", user);
        fetchMyOrders(user);
      } else {
        console.error("User not authenticated.");
      }
    });
  });
  
  
    async function cancelOrder(orderId) {
      const confirmCancel = await Swal.fire({
        title: 'Cancel Order',
        text: 'Are you sure you want to cancel this order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, Cancel',
        cancelButtonText: 'No'
      });
    
      if (confirmCancel.isConfirmed) {
        // Update the order status to "cancelled"
        await db.collection("orders").doc(orderId).update({ status: "cancelled" });
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Order Cancelled",
          text: "The order has been cancelled."
        });
        // Refresh the orders list
        fetchMyOrders();
      }
    }
    
    // Logout function
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
    
}
function offers() {
    document.querySelector('html').innerHTML = `
    <!DOCTYPE html>
<html>
<head>
  <title>ᴛʀᴜʟꜱ</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="CSS/styles.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.4/dist/sweetalert2.min.css" />
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
  <div class="tab-nav-container">
    <div class="tab" onclick="home()">
      <i class='bx bx-home'></i>
      <p></p>
    </div>
    <div class="tab" onclick="orders()">
      <i class='bx bx-cart'></i>
      <p></p>
    </div>
    <div class="tab" onclick="hsearch()">
      <i class='bx bx-search' ></i>
      <p></p>
    </div>
    <div class="tab" onclick="support()">
      <i class='bx bx-support' ></i>
      <p></p>
    </div>
    <div class="tab" onclick="profile()">
      <i class='bx bx-user' ></i>
      <p></p>
    </div>
  </div>
  <div class="head">
    <h3 class="bx bx-arrow-back" onclick="window.location.replace('home.html')"> Notifications</h3>
    <h3 class="right">
      <i class="bx bxs-bell" style="color: #ff014d;" onclick="offers()"></i>
<!--      
      <i class='bx bx-log-out' onclick="logout()"></i> -->
      <i></i>
     </h3>
  </div>
  <br><br><br> 
  <div class="" style="color: black;" id="notificationsList" align="center">
  </div>
  <script   src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
  <script src="JS/offers.js"></script>
  
  <script src="JS/nav.js"></script>
<br><br><br>
<style>
  .ftr  {
    text-align: right;
  }
/* Style for the notification container */
#notificationsList {
  max-width: fit-content;
  margin: 0 auto;
  max-width: 90%;
  min-width: 90%;
  color: black;
  
}

/* Style for each notification item */
.notification-item {
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 15px;
  box-shadow: 0 2px 5px #505050;
}

/* Style for the image within the notification */
.notification-item img {
  width: 80%;
  height: auto;
  margin-bottom: 10px;
}

/* Style for the message text */
.notification-item h3 {
  margin: 0;
  font-size: 18px;
  color: #000000;
}


</style>
</body>
</html>

    `
    var firebaseConfig = {
      apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
      authDomain: "https://raona0-default-rtdb.firebaseio.com",
      projectId: "raona0",
      storageBucket: "raona0.appspot.com",
      messagingSenderId: "797719983777",
      appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
    };
    notificationsList.innerHTML = "<div class='loading'></div>"; // Clear previous notifications
    
  
  
  // Function to format timestamps as "time ago"
  function formatTimeAgo(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
  }
  
  // Function to fetch and display messages for the current user
  async function fetchMessagesForUser(userId) {
    try {
      const messagesRef = db.collection("messages");
      const querySnapshot = await messagesRef.where("userIds", "array-contains", userId).get();
  
      const notificationsList = document.getElementById("notificationsList");
      notificationsList.innerHTML = ""; // Clear previous notifications
  
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        const notificationItem = document.createElement("div");
        notificationItem.classList.add("notification-item");
  
        const sentTimestamp = messageData.timestamp; // Assuming timestamp is already a valid Date object
  
        const formattedTimestamp = formatTimeAgo(sentTimestamp);
  
        // Include the image URL if available
        let imageElement = "";
        if (messageData.imageURL) {
          imageElement = `<img src="${messageData.imageURL}" alt="Message Image" class="message-image">`;
        }
  
        notificationItem.innerHTML = `
          ${imageElement}
          <h3>${messageData.message}</h3>
        `;
        notificationsList.appendChild(notificationItem);
      });
      if (doc.size == 0) {
        notificationsList.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><br> <h3>🔔 No Notifications</h3>'
   
      }
    } catch (error) {
      notificationsList.innerHTML = '<br><br><br><br><br><br><br><br><br><br><br><br> <h3>🔔 No Notifications</h3>'
    }
  }
  
  // Fetch messages when the user is authenticated
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User authenticated:", user);
      fetchMessagesForUser(user.uid); // Pass the user's UID to the function
    } else {
      console.error("User not authenticated.");
    }
  });
}
function support() {
    document.querySelector('html').innerHTML = `
    <!DOCTYPE html>
<html>

<head>
  <title>ᴛʀᴜʟꜱ</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="CSS/styles.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.6/dist/sweetalert2.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.6/dist/sweetalert2.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="tab-nav-container">
    <div class="tab" onclick="home()">
      <i class='bx bx-home'></i>
      <p></p>
    </div>
    <div class="tab" onclick="orders()">
      <i class='bx bx-cart'></i>
      <p></p>
    </div>
    <div class="tab" onclick="hsearch()">
      <i class='bx bx-search'></i>
      <p></p>
    </div>
    <div class="tab active">
      <i class='bx bx-support' ></i>
      <p></p>
    </div>
    <div class="tab" onclick="profile()">
      <i class='bx bx-user' ></i>
      <p></p>
    </div>
  </div>
  <div class="head">
    <h3 class="bx bx-arrow-back" onclick="window.location.replace('home.html')"> Support Centre</h3>

    <h3 class="right">
      <i class="bx bx-bell" onclick="offers()"></i>
<!--      
      <i class='bx bx-log-out' onclick="logout()"></i> -->
      <i></i>
     </h3>
  </div>
  <br><br><br>
<h2>CONTACT US</h2>
  <div id="roomList">
    <h3>Email</h3>
    <h4>Business Email: <a href="mailto:trusted_deals@net-shopping.com">trusted_deals@net-shopping.com</a></h4>
    <h4>Customer Care: <a href="mailto:customer-care@email.com">customer-care@email.com</a></h4>
  </div> <br>
  <div id="roomList">
    <h3>Phone Number</h3>
    <h4><a href="tel:+917080060441">+91-7080060441</a></h4>
  </div> <br>
  <div id="roomList">
    <h3>Address</h3>
    <h4>Business Address: Maniram, Uttar Pradesh, India, 273007</h4>
    <h4>Company Address: TaraMandal, Uttar Pradesh, India</h4>
  </div>
  <br>
  <nav>
    <ul>
      <li><a href="#terms" class="bx bx-cart"> Terms</a></li>
      <li><a href="#privacy" class="bx bx-lock"> Privacy</a></li>
    </ul>
  </nav>
  <section id="terms">
    <div class="container">
      <h2>Terms and Conditions</h2>
      <p>
        By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms and conditions, please do not use our website.
      </p>
  
      <h3>Products and Services:</h3>
      <p>
        Trusted Deals Inc offers a range of products and services for online purchase. By making a purchase, you agree to be bound by the terms and conditions outlined in the specific product or service description.
      </p>
  
      <h3>Returns and Refunds:</h3>
      <p>
        Please note that returns and refunds are not accepted for any products or services provided by Trusted Deals Inc. All sales are final.
      </p>
  
      <h3>User Accounts:</h3>
      <p>
        To access certain features of our website, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and password.
      </p>
  
      <h3>Intellectual Property:</h3>
      <p>
        All content and materials available on our website, including but not limited to text, graphics, logos, images, and software, are the property of Trusted Deals Inc and are protected by applicable copyright and trademark laws.
      </p>
  
      <h3>Limitation of Liability:</h3>
      <p>
        Trusted Deals Inc shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of our website or services.
      </p>
  
      <h3>Governing Law:</h3>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of Indian Constitution. Any dispute arising from these terms shall be subject to the exclusive jurisdiction of the courts in that location.
      </p> </div>
  </section>
  
  <section id="privacy">
    <div class="container">
      <h2>Privacy Policy</h2>
      <p>
        Trusted Deals Inc values your privacy and is committed to protecting your personal information. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your personal data.
      </p>
  
      <h2>Information We Collect:</h2>
      <p>
        We may collect personal information from you, including your name, contact details, billing and shipping addresses, and payment information, when you make a purchase on our website.
      </p>
  
      <h2>Use of Information:</h2>
      <p>
        We use your personal information to process orders, provide customer support, and improve our services. We do not share your information with third parties except as required for order fulfillment.
      </p>
  
      <h2>Security Measures:</h2>
      <p>
        We implement industry-standard security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is 100% secure.
      </p>
  
      <h2>Cookies:</h2>
      <p>
        We use cookies to enhance your browsing experience and track usage patterns. You can modify your browser settings to disable cookies, but this may impact your experience on our website.
      </p>
  
      <h2>Updates to Privacy Policy:</h2>
      <p>
        We reserve the right to update our Privacy Policy as needed. Changes will be posted on our website, and continued use of our services signifies your acceptance of the changes.
      </p>
  
      <p>
        For any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:trusted_deals@net-shopping.com">trusted_deals@net-shopping.com</a>.
      </p>
    </section>
  
    <footer>
      <p>&copy; 2023 Trusted Deals Inc. All rights reserved.</p>
    </footer>
    </section>
  
    
      </div>
  </section>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script   src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
  
  <script src="JS/nav.js"></script>
  <style>
    body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  color: white;
  text-align: center;
  padding: 20px;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin: 0;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

.container {
  max-width: 800px;
  margin: 30px auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

footer {
  text-align: center;
  padding: 20px;
  color: white;
}

a {
  color: #5900ff;
}

    *{
  -moz-outline-style: none; /* For Firefox */
  -webkit-tap-highlight-color: transparent; /* For WebKit/Blink-based browsers */

}
    /* Style for the loading spinner */
.loading-spinner {
  align-items: center;
  justify-content: center;
}

.spinner {
  border: 4px solid rgba(77, 77, 77, 0.3);
  border-radius: 50%;
  border-top: 4px solid #0026ff;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

body {
  font-family: Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

#roomList {
  border-radius: 5px;
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  color: rgb(0, 0, 0);
  background-color: white;
  box-shadow: 0px 0px 10px rgb(197, 197, 197);
}

#roomList h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  color: white;
  background-color: #030303;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(138, 138, 138, 0.1);
}

li a {
  color: white;
  text-decoration: none;
  margin-left: 10px;
}

li img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}


  </style>
</body>

</html>

    `
}
function profile() {
    document.querySelector('html').innerHTML = `
    <!DOCTYPE html>
<html>

<head>
  <title>ᴛʀᴜʟꜱ</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="CSS/styles.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.6/dist/sweetalert2.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.1.6/dist/sweetalert2.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="tab-nav-container">
    <div class="tab" onclick="home()">
      <i class='bx bx-home'></i>
      <p></p>
    </div>
    <div class="tab" onclick="orders()">
      <i class='bx bx-cart'></i>
      <p></p>
    </div>
    <div class="tab" onclick="hsearch()">
      <i class='bx bx-search'></i>
      <p></p>
    </div>
    <div class="tab" onclick="support()">
        <i class='bx bx-support'></i>
        <p></p>
      </div>
      <div class="tab active">
        
        <i class='bx bxs-user' onclick="logout()"></i>
        <p></p>
      </div>
  </div>
  <div class="head">
    <h3 class="bx bx-arrow-back" onclick="window.location.replace('home.html')"> My Profile</h3>

    <h3 class="right">
      <i class="bx bx-bell" onclick="offers()"></i>
     
      <i class='bx bx-log-out' onclick="logout()"></i>
      <i></i>
     </h3>
  </div>
  <br><br><br>
 
</head>
<body><br>
 <div class="ds" align="center">
  <div class="container" align="center">
    <div class="profile-card">
      <img class="profile-picture" id="profile-picture" src="" >
      <p id="user-name"></p>
      <p id="user-email"></p>
      <button id="editProfileBtn" class="bx bx-edit"> Edit</button>
      <div class="shipping-card">
        <h2>Shipping Address</h2>
        <p id="shipping-address"></p>
        <div id="phone-number">None</div>
<div id="email"></div>
        <button id="editShippingBtn" class="bx bx-edit"> Edit</button>
      </div>
    </div>
    
  </div>
 </div>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script   src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
  <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>  
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
 
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
  
  <script src="JS/nav.js"></script>
  <script src="JS/profile.js"></script>
  <br><br><br>
  <style>
   /* Add your CSS styling here to match Amazon's style */
    /* This is just a basic layout; adjust it as needed */
    body {
      font-family: Arial, sans-serif;
    }
    header {
      background-color: #232f3e;
      color: white;
      padding: 10px;
      text-align: center;
    }
    .profile-card {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .profile-picture {
      border: 1px solid rgb(39, 39, 39);
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: contain;
      margin-bottom: 10px;
    }
    .img {
      object-fit: contain;
    }
    .swal2-input,.swal2-file, .swal2-textarea {
      width: 90%;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    input {
      width: 50%;
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    button {
      color: #ffffff;
      border: none;
      width: fit-content;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</body>

</html>
    `
    
auth.onAuthStateChanged(async user => {
  if (user) {
    const userId = user.uid;
    let phoneNumber = '';
    let email = '';
    const phoneNumberElement = document.getElementById('phone-number');
    const emailElement = document.getElementById('email');
    const shippingAddressElement = document.getElementById('shipping-address');

    const profilePicture = document.getElementById('profile-picture');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const shippingAddress = document.getElementById('shipping-address');

    profilePicture.src = user.photoURL || 'https://wallpapers.com/images/hd/cool-pictures-fz4qiypiy3ob4vix.jpg';
    userName.textContent = user.displayName || '';
    userEmail.textContent = user.email || '';

    // Display the shipping address
    const userDocRef = db.collection("shippingAddresses").doc(userId);
    try {
      const userDoc = await userDocRef.get();
      if (userDoc.exists && userDoc.data().shippingAddress) {
        shippingAddressElement.textContent = userDoc.data().shippingAddress;
      } else {
        shippingAddressElement.textContent = "No shipping address saved.";
      }
    } catch (error) {
      console.error("Error fetching shipping address:", error);
    }


    async function updateUserProfile(userId, displayName, photoURL) {
      profilePicture.src = user.photoURL || 'https://wallpapers.com/images/hd/cool-pictures-fz4qiypiy3ob4vix.jpg';
      userName.textContent = user.displayName || '';
      userEmail.textContent = user.email || '';
    }
      
      
    document.getElementById("editProfileBtn").addEventListener("click", async () => {
      const { value: formValues } = await Swal.fire({
        title: "Edit Profile",
        html:
          `<input id="swal-newName" class="swal2-input" placeholder="New Name" value="${user.displayName || ''}" minlength="3" maxlength="16"> <br>` +
          `<label for="swal-newPhoto" class="swal2-file-label bx bx-plus"> Profile Picture<input type="file" id="swal-newPhoto" class="swal2-file" style="display:none;"></label>`, // Replace "Icon Here" with your icon
    
        focusConfirm: false,
        preConfirm: () => {
          const newNameInput = document.getElementById("swal-newName");
          const newPhotoInput = document.getElementById("swal-newPhoto");
    
          const newName = newNameInput.value.trim();
          const newPhoto = newPhotoInput.files[0];
    
          if (newName.length < 3 || newName.length > 16) {
            Swal.showValidationMessage("Username must be between 3 and 16 characters");
            return false;
          }
    
          return {
            newName,
            newPhoto,
          };
        },
      });
    
      if (formValues) {
        const { newName, newPhoto } = formValues;
    
        Swal.fire({
          title: "Updating Profile...",
          allowOutsideClick: false,
          didOpen: async () => {
            Swal.showLoading();
    
            try {
              if (newPhoto) {
                const storageRef = firebase.storage().ref();
                const photoRef = storageRef.child(`profile-photos/${userId}`);
                const uploadTask = photoRef.put(newPhoto);
    
                const snapshot = await uploadTask;
                const downloadURL = await snapshot.ref.getDownloadURL();
                await user.updateProfile({
                  displayName: newName,
                  photoURL: downloadURL,
                });
    
                updateUserProfile(userId, newName, downloadURL);
                Swal.fire("Success!", "Profile updated successfully!", "success");
              } else {
                await user.updateProfile({
                  displayName: newName,
                });
    
                updateUserProfile(userId, newName, user.photoURL);
                Swal.fire("Success!", "Profile updated successfully!", "success");
              }
            } catch (error) {
              Swal.fire("Error", "An error occurred while updating the profile.", "error");
              console.error("Error updating profile:", error);
            }
          },
        });
      }
    });
    

    try {
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        phoneNumber = userData.phoneNumber || '';
        email = userData.email || '';
        phoneNumberElement.textContent = phoneNumber; // Update phone number element
        emailElement.textContent = email; // Update email element
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    document.getElementById("editShippingBtn").addEventListener("click", async () => {
      const { value: formValue } = await Swal.fire({
        title: "Edit Shipping Address",
        html:
          `<div style="text-align: center;">
            <textarea id="swal-shippingAddress" class="swal2-textarea" placeholder="Enter new shipping address">${shippingAddressElement.textContent}</textarea><br>
            <input id="swal-phoneNumber" class="swal2-input" placeholder="Enter phone number" value="${phoneNumber || ''}"><br>
            <input id="swal-email" class="swal2-input" placeholder="Enter email" value="${email || ''}">
          </div>`,
        focusConfirm: false,
        preConfirm: () => {
          const newShippingAddress = document.getElementById("swal-shippingAddress").value;
          const newPhoneNumber = document.getElementById("swal-phoneNumber").value;
          const newEmail = document.getElementById("swal-email").value;
    
          if (!newShippingAddress.trim() || !newPhoneNumber.trim() || !newEmail.trim()) {
            Swal.showValidationMessage("All fields are required");
            return false;
          }
    
          if (newPhoneNumber.length !== 10 || isNaN(newPhoneNumber)) {
            Swal.showValidationMessage("Phone number must be 10 digits");
            return false;
          }
    
          // You can use regular expressions or other methods to validate the email format
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!newEmail.match(emailPattern)) {
            Swal.showValidationMessage("Invalid email format");
            return false;
          }
    
          return {
            newShippingAddress,
            newPhoneNumber,
            newEmail,
          };
        },
        showCancelButton: true,
        confirmButtonText: "Save",
      });
    
      if (formValue) {
        try {
          // Update shipping address, phone number, and email
          const newShippingAddress = formValue.newShippingAddress;
          const newPhoneNumber = formValue.newPhoneNumber;
          const newEmail = formValue.newEmail;
    
          await db.collection("shippingAddresses").doc(userId).set({
            shippingAddress: newShippingAddress,
            phoneNumber: newPhoneNumber,
            email: newEmail,
          });
    
          // Update the displayed values
          shippingAddressElement.textContent = newShippingAddress;
          phoneNumber = newPhoneNumber;
          email = newEmail;
          phoneNumberElement.textContent = phoneNumber;
          emailElement.textContent = email;
    
          Swal.fire("Success!", "Shipping address updated successfully!", "success");
        } catch (error) {
          Swal.fire("Error", "An error occurred while updating the shipping address.", "error");
          console.error("Error updating shipping address:", error);
        }
      }
    });
    

  } else {
    console.log("User is not signed in");
  }
});

}
function hsearch() {
    document.querySelector('html').innerHTML = `
    <!DOCTYPE html>
<html>

<head>
  <title>ᴛʀᴜʟꜱ</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="CSS/styles.css">
  <link rel="stylesheet" href="CSS/pr.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>

<body>
  <div class="tab-nav-container">
    <div class="tab " onclick="home()">
      <i class='bx bx-home'></i>
      <p></p>
    </div>
    <div class="tab" onclick="orders()">
      <i class='bx bx-cart'></i>
      <p></p>
    </div>
    <div class="tab active purple">
      <i class='bx bx-search'></i>
      <p></p>
    </div>
    <div class="tab" onclick="support()">
      <i class='bx bx-support' ></i>
      <p></p>
    </div>
    <div class="tab" onclick="profile()">
      <i class='bx bx-user' ></i>
      <p></p>
    </div>
  </div>
  <div class="head">
    <h3 class="bx bx-arrow-back" onclick="window.location.replace('home.html')"> Search</h3>

    <h3 class="right">
      <i class="bx bx-bell"  onclick="offers()"></i>
<!--      
      <i class='bx bx-log-out' onclick="logout()"></i> -->
      <i></i>
    </h3>
  </div>
  <br><br><br><br>
  <div class="h" align="center"> <br>
    <div class="srv" align="center">
      <input type="text" id="searchInput" placeholder="Search anything">
      <button id="searchButton" class="bx bx-search"></button>
    </div> <br>
    
    <h3 id="dsd"></h3>
    
    <h3 id="dh"></h3>
    <div class="container" id="productList" align="center">

    </div>
  </div>
  
    <br><br><br>
<style>
  .srv {

  width: 66%;
  box-shadow: 0 2px 5px rgba(79, 79, 79, 0.405);
  border: 1px solid rgb(255, 255, 255);
  background-color: #ffffff;
  color: rgb(61, 61, 61);
  display: flex;
  height: 60px;
}
input::placeholder {
  color: rgb(52, 52, 52);
  font-size: 12px;
}
    input {
      outline: none;
      box-shadow: none;
      border: none;
      padding: none;
      width: 70%;
      height: auto;
    }
    #searchButton {
      color: black;
      padding: none;
      width: 20%;
      height: 30px;
      margin: none;
      background-color: white;
      box-shadow: none;
    }
header {
  background-color: #232f3e;
  color: #000000;
  padding: 10px 0;
  text-align: center;
}


 .product-card button, button::after {
   /*Make sure the animation is over the whole element*/

  -webkit-animation-name: ShineAnimation;
  -webkit-animation-duration: 5s;
  
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: cubic-bezier(.12,.89,.98,.47);
}

@-webkit-keyframes ShineAnimation{
  from {
      background-repeat:no-repeat;
      background-image:-webkit-linear-gradient(
          top left,
          rgba(255, 255, 255, 0.0) 0%,
          rgba(255, 255, 255, 0.0) 45%,
          rgba(255, 255, 255, 0.5) 48%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0.5) 52%,
          rgba(255, 255, 255, 0.0) 57%,
          rgba(255, 255, 255, 0.0) 100%
      );
      background-position:-250px -250px;
      background-size: 250px 250px
  }
  to {
      background-repeat:no-repeat;
      background-position:250px 250px;
  }
}
   
</style>
 <script   src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
 <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
 <script  src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>  
 <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>  
 <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
    <script src="JS/s.js"></script>
    
    <script src="JS/nav.js"></script>
</body>

</html>
    `
   
    
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
      <div class='det'>
      <h2 class="product-title" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.name}</h2>
      <h2 class="product-titlee" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.description}</h2>
      <div class="product-price" onclick="window.location.href = 'item.html?request-id=${doc.id}'"><div class='discd'>${(100*product.price/product.originalPrice-100).toFixed()*-1}%</div> <div class='op'>${product.originalPrice}</div> ₹${product.price}</div>
      <div class="product-rate" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${rating} <div class='imggo'><img src='/images/tic.gif'></div></div>
      <div class="del" onclick="window.location.href = 'item.html?request-id=${doc.id}'">Free Delivery</div>
      
  
        </div>
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
        pistElementu.innerHTML = `Found ${matchedProducts.length} Products`
        productCard.className = 'ssw product-card'; // Apply the .ssw class
        productCard.innerHTML = `
        <img class="product-image" src="${product.mainImage}" onclick="window.location.href = 'item.html?request-id=${doc.id}'">
        <div class='det'>
        <h2 class="product-title" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.name}</h2>
        <h2 class="product-titlee" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${product.description}</h2>
        <div class="product-price" onclick="window.location.href = 'item.html?request-id=${doc.id}'"><div class='discd'>${(100*product.price/product.originalPrice-100).toFixed()*-1}%</div> <div class='op'>${product.originalPrice}</div> ₹${product.price}</div>
        <div class="product-rate" onclick="window.location.href = 'item.html?request-id=${doc.id}'">${rating} <div class='imggo'><img src='/images/tic.gif'></div></div>
        <div class="del" onclick="window.location.href = 'item.html?request-id=${doc.id}'">Free Delivery</div>
        
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
  
}




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