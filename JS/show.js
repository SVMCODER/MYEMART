var firebaseConfig = {
    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
    authDomain: "https://raona0-default-rtdb.firebaseio.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
  };
  firebase.initializeApp(firebaseConfig);

  let slideshowInterval;
  const db = firebase.firestore();
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

// Function to open the popup
function openPopup(index) {
  clearInterval(slideshowInterval);

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <span class="popup-close" onclick="closePopup()">&times;</span>
    <img src="${images[index]}" class="popup-image" />
  `;

  document.body.appendChild(popup);
  // showPopupSlide(index);
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
  slideshowInterval = setInterval(nextSlide, 3000);
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
  
        const productCard = document.createElement('div');
        productCard.className = 'product-details-card';
        productCard.innerHTML = `
          <div id="slider">
            <img src="${product.mainImage}" class="slide" id="slideImage" />
            <br>
          </div>
          <div class="product-info">
            <h2 class="product-title">${product.name}</h2>
            <div class="product-price">
              <div class='strike'>
                ₹${product.originalPrice}
              </div>
              <div class="product-discount">Discount: ₹${product.discount}</div>
              ₹${product.price}
            </div>
            <button class="bx bx-cart" onclick="window.location.replace('buy.html?id=${productId}')"> 𝙱𝚞𝚢</button>
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
          </div>
        `;
  
        productDetailsElement.innerHTML = '';
        productDetailsElement.appendChild(productCard);
  
        images = [product.mainImage, product.image1, product.image2, product.image3, product.image4];
  
        const slider = document.getElementById('slider');
        const slideImage = document.getElementById('slideImage');

// Display mini image previews below the main slide
const thumbnailContainer = document.createElement('div');
thumbnailContainer.className = 'thumbnail-container';
thumbnailContainer.innerHTML = images
  .map((img, i) => `<img src="${img}" class="thumbnail ${i === currentIndex ? 'active' : ''}" onclick="gotoSlide(${i})" />`)
  .join('');

slider.appendChild(thumbnailContainer);
// function showPopupSlide(index) {
//   const popupImage = document.querySelector('.popup-image');
//   const popupThumbnails = document.querySelectorAll('.thumbnail');

//   popupImage.src = images[index];

//   popupThumbnails.forEach((thumbnail, idx) => {
//       if (idx === index) {
//           thumbnail.classList.add('active');
//       } else {
//           thumbnail.classList.remove('active');
//       }
//   });
// }
// // Add left and right navigation buttons
// const prevButton = document.createElement('button');
// prevButton.className = 'slider-button prev-button';
// prevButton.innerHTML = '❮';
// prevButton.onclick = () => gotoSlide(currentIndex - 1);
// slider.appendChild(prevButton);

// const nextButton = document.createElement('button');
// nextButton.className = 'slider-button next-button';
// nextButton.innerHTML = '❯';
// nextButton.onclick = () => gotoSlide(currentIndex + 1);
// slider.appendChild(nextButton);
  
// Rest of your previous code

function showSlide(index) {
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  currentIndex = index;
  slideImage.src = images[currentIndex];

  // showPopupSlide(index); // Update the popup image as well

  // Update active thumbnail
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach((thumbnail, i) => {
      thumbnail.classList.toggle('active', i === currentIndex);
  });
}

// Rest of your previous code

        // Rest of your code for the popup and slide functionality
      } else {
        productDetailsElement.innerHTML = '<p>Product not found.</p>';
      }
    } catch (error) {
      productDetailsElement.innerHTML = '<p>Error loading product details.</p>';
      console.error(error);
    }
  };


  function openPopup(index) {
    // Clear the slideshow interval when the popup is opened
    clearInterval(slideshowInterval);
  
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
      <span class="popup-close" onclick="closePopup()">&times;</span>
      <div class="popup-slider">
        <button class="popup-slider-btn popup-slider-btn-left" onclick="previousPopupSlide()">&#10094;</button>
        <img src="${images[index]}" class="popup-image" />
        <button class="popup-slider-btn popup-slider-btn-right" onclick="nextPopupSlide()">&#10095;</button>
      </div>
      <div class="popup-pagination">
        ${images.map((_, i) => `<span class="popup-dot" onclick="gotoPopupSlide(${i})"></span>`).join("")}
      </div>
    `;
  
    document.body.appendChild(popup);
  
    // Show the initially selected slide
    // showPopupSlide(index);
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
  popup.innerHTML = `
    <span class="popup-close" onclick="closePopup()">&times;</span>
    <div class="popup-slider">
      <button class="popup-slider-btn popup-slider-btn-left" onclick="previousPopupSlide()">&#10094;</button>
      <img src="${images[index]}" class="popup-image" />
      <button class="popup-slider-btn popup-slider-btn-right" onclick="nextPopupSlide()">&#10095;</button>
    </div>
    <div class="popup-pagination">
      ${images.map((_, i) => `<span class="popup-dot" onclick="gotoPopupSlide(${i})"></span>`).join("")}
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

  