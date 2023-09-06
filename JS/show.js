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
const storage = firebase.storage();
let slideshowInterval;
const auth = firebase.auth()
// Define variables
let currentIndex = 0;
let images = []; // Fill this array with your image URLs

function showPopupSlide(index) {
  try {
    const popupImage = document.querySelector('.popup-image');
    const popupThumbnails = document.querySelectorAll('.thumbnail');

    popupImage.src = images[index];

    popupThumbnails.forEach((thumbnail, idx) => {
      if (idx === index) {
        thumbnail.classList.add('active');
      } else {
        thumbnail.classList.remove('active');
      }
    });
  } catch (error) {
    // Handle the error gracefully (e.g., log it or ignore it)
  }
}

// Function to show the selected slide
function showSlide(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  currentIndex = index;
  slideImage.src = images[currentIndex];

  // Update active thumbnail
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.classList.toggle('active', i === currentIndex);
  });

  // // Update popup image
  // showPopupSlide(currentIndex);
}

// Function to go to the next slide
function nextSlide() {
  showSlide(currentIndex + 1);
}

// Function to go to a specific slide
function gotoSlide(index) {
  showSlide(index);
}

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
    startSlideshow();
  }
}

// Function to start the slideshow
function startSlideshow() {
  // Your slideshow start logic here
}

const displayProductDetails = async () => {
  const productDetailsElement = document.getElementById('productDetails');
  productDetailsElement.innerHTML = '<div class="loading"></div>'; // Show loading spinner

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('request-id');

  try {
    const productDoc = await db.collection('products').doc(productId).get();
    if (productDoc.exists) {
      const product = productDoc.data();
      productDetailsElement.innerHTML = '<div class="loading"></div>'; // Show loading spinner

      // Define size options based on product category
      const sizeOptions = product.productCategory === 'cloth' ?
        ['Small', 'Medium', 'Large', 'XL', 'XXL'] :
        ['US 6', 'US 7', 'US 8', 'US 9', 'US 10'];

      // Filter and limit images
      images = [product.mainImage, product.image1, product.image2, product.image3, product.image4]
        .filter(Boolean) // Remove null or undefined images
        .slice(0, 4); // Limit to a maximum of 4 images

      if (product.productCategory === 'cloth' && images.length < 4) {
        images.push('https://cdn.shopify.com/s/files/1/0363/2493/3763/files/SIZE_CHART-01_1_480x480.jpg?v=1676102635');
      }

      if (product.productCategory === 'footwear' && images.length < 4) {
        images.push('https://images.meesho.com/images/products/44363/1_512.jpg');
      }
      desc = product.description
      const productCard = document.createElement('div');
      document.title = `ᴛʀᴜꜱᴛᴇᴅ ᴅᴇᴀʟꜱ.in | ${product.name}`;
      productCard.className = 'product-details-card';
      productCard.innerHTML = `
        <div id="slider">
          <img src="${product.mainImage}" class="slide" id="slideImage" onclick="openPopup(0)" />
          <br>
          <hr>
          <br>
        </div>
        <div class="product-info">
          <hr>
          <h2 class="product-title">${product.name}</h2>
          <hr>
          <div class="product-price">
            <h4 class='strike'>
              ₹${product.originalPrice}
            </h4>
            <h4 class="product-discount">Discount: ₹${product.discount}</h4>
            <h2>₹${product.price}</h2>
            <h3 style='color: crimson;'>${product.rating}</h3>
          </div>
          <div id='smu'>
            <!-- Size Selector -->
            ${product.productCategory === 'cloth' || product.productCategory === 'footwear' ? `
              <div class="size-selector">
                <h3 style='color:black'>Choose Size:</h3>
                <select id="sizeSelect">
                  ${sizeOptions.map(option => `<option value="${option.toLowerCase()}">${option}</option>`).join('')}
                </select>
              </div>` : ''}
          </div><br>
          <div class="product-specs">
            <h3>About This Item</h3>
            <h4>${desc.replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('\n','<br>').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','').replace('Within 6-8 business days However, to find out an actual date of delivery, please enter your pin code.','').replace('null','')}</h4>
          </div>
          
          <hr>
          <div class='gallery'>
            <h3>Gallery</h3>
            ${images.map(image => `<img src="${image}">`).join('')}
          </div>
        </div>
        <br>
        <hr>
        <br>
        <h3>Customer Feedbacks</h3>
        <button id="openFeedbackBtn" onclick="openFeedbackForm()">Leave Feedback</button>
        <hr>
        <div id='rev'></div>
      `;
 // Fetch reviews for the product from Firestore
// Fetch reviews for the product from Firestore


      
productDetailsElement.innerHTML = '';
      document.getElementById('io').innerHTML = `
        <div class="bx bx-share tab" id="copy-url-button" onclick="copylink()"> Share</div>
        <div class="bx bx-cart tab" id="oi" onclick="window.location.href = 'buy.html?id=${productId}'"> Buy</div>`;
       // Fetch reviews for the product from Firestore
       auth.onAuthStateChanged(async user => {
        if (user) {
          
const reviewsSnapshot = await db.collection('feedback')
.where('productId', '==', productId) 
.get();

const reviews = [];
reviewsSnapshot.forEach((doc) => {
const reviewData = doc.data();
reviews.push(reviewData);
});

const reviewsContainer = document.createElement('div');
reviewsContainer.className = 'reviews-container';

if (reviews.length > 0) {
const reviewsList = document.createElement('div');
reviewsList.className = 'reviews-list';

reviews.forEach((review) => {
  const reviewItem = document.createElement('div');
  reviewItem.className = 'review-item';
  reviewItem.innerHTML = `
    <div class="review-user">
      <img src="${user.photoURL || 'images/user.png'}" alt="${review.userName}" class="user-avatar">
      <span class="user-name">${review.userName}</span>
    </div>
    <div class="review-text">${review.text}</div>
  `;
  reviewsList.appendChild(reviewItem);
});

reviewsContainer.appendChild(reviewsList);
} else {
reviewsContainer.innerHTML = '<p>No reviews available for this product.</p>';
}

  document.getElementById('rev').appendChild(reviewsContainer);
        }
      });
     
      productDetailsElement.appendChild(productCard);
      const slider = document.getElementById('slider');
      const slideImage = document.getElementById('slideImage');

      // Display mini image previews below the main slide
      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.className = 'thumbnail-container';
      thumbnailContainer.innerHTML = images
        .map((img, i) => `<img src="${img}" class="thumbnail ${i === currentIndex ? 'active' : ''}" onclick="gotoSlide(${i})"/>`)
        .join('');
      slider.appendChild(thumbnailContainer);
if (product.productCategory != 'other') {
  // Add event listener to save the selected size in local storage when changed
const sizeSelect = document.getElementById('sizeSelect');
sizeSelect.addEventListener('change', (event) => {
  const selectedSize = event.target.value;
  localStorage.setItem('selectedSize', selectedSize);
  console.log(selectedSize)
});
}
      // Rest of your code for popup and slide functionality
    } else {
      productDetailsElement.innerHTML = '<p>Product not found.</p>';
    }
  } catch (error) {
    productDetailsElement.innerHTML = '<p>Error loading product details.</p>';
    console.error(error);
  }
};


function openFeedbackForm() {
  const user = auth.currentUser
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('request-id'); // Fetch productId
  Swal.fire({
    title: 'Leave Feedback',
    html: `
      <textarea type="text" id="feedbackInput">Very amazing product 😍👌 Must Buy!</textarea>
    `,
    showCancelButton: true,
    confirmButtonText: 'Submit',
    preConfirm: async () => {
      const feedbackText = Swal.getPopup().querySelector('#feedbackInput').value;

      if (!feedbackText) {
        Swal.showValidationMessage('Please enter your feedback');
      }

      

      // Save feedback in Firebase Firestore (you need to set up Firebase for this)
      const feedbackData = {
        text: feedbackText,
        productId: productId,
        userName: user.displayName, // You need to implement a function to get the current user's profile picture
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await db.collection('feedback').add(feedbackData);

      return feedbackData;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Feedback Submitted', 'Thank you for your feedback!', 'success');
    }
  });
}

// ... (rest of your code)

function gotoSlide(index) {
showSlide(index);
// showPopupSlide(index);
}


// Function to open the popup
function openPopup(index) {
  clearInterval(slideshowInterval);
  
  const popup = document.createElement('div');
  popup.className = 'popup';
  
  // Check if there is more than one image to determine whether to show navigation buttons
  const showNavigationButtons = images.length > 1;
  
  popup.innerHTML = `
    <span class="popup-close" onclick="closePopup()">&times;</span>
    <div class="popup-slider">
      ${showNavigationButtons ? `<button class="popup-slider-btn popup-slider-btn-left" onclick="previousPopupSlide()">&#10094;</button>` : ''}
      <img src="${images[index]}" class="popup-image" />
      ${showNavigationButtons ? `<button class="popup-slider-btn popup-slider-btn-right" onclick="nextPopupSlide()">&#10095;</button>` : ''}
    </div>
  `;
  
  document.body.appendChild(popup);
  showPopupSlide(index);
}

// Function to close the popup
function closePopup() {
const popup = document.querySelector('.popup');
if (popup) {
  popup.remove();
  startSlideshow();
}
}

// Function to navigate to a specific slide within the popup
function gotoPopupSlide(index) {
currentIndex = index;
showPopupSlide(currentIndex);
}

// Function to show the previous slide within the popup
function previousPopupSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showPopupSlide(currentIndex);
}

// Function to show the next slide within the popup
function nextPopupSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  showPopupSlide(currentIndex);
}



// Display product details when the page loads
displayProductDetails();

// Assuming you have included the SweetAlert library
function copylink() {
const currentUrl = window.location.href;
const tempInput = document.createElement('input');
document.body.appendChild(tempInput);
tempInput.value = currentUrl;
tempInput.select();
document.execCommand('copy');
document.body.removeChild(tempInput);

Swal.fire({
  icon: 'success',
  title: 'Link Copied!',
  text: 'Share the link with your friends and family.',
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false
});
}
