var firebaseConfig = {
    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
    authDomain: "https://raona0-default-rtdb.firebaseio.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
  };
  firebase.initializeApp(firebaseConfig);
 
  let slideshowInterval; // Global variable to hold the interval ID
  const db = firebase.firestore();

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
          <div id="slider">
            <img src="${product.mainImage}" class="slide" id="slideImage" />
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
        </div>
      `;
  
      productDetailsElement.appendChild(productCard);
  
      const slider = document.getElementById('slider');
      const slideImage = document.getElementById('slideImage');
      const images = [`${product.mainImage}`, `${product.image1}`, `${product.image2}`,`${product.image3}`,`${product.image4}`];
      let currentIndex = 0;
  
      function showSlide(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
  
        currentIndex = index;
        slideImage.src = images[currentIndex];
        slideImage.src = images[currentIndex];
  slideImage.addEventListener('click', () => openPopup(currentIndex));
      }
      function openPopup(index) {
        // Clear the slideshow interval when the popup is opened
        clearInterval(slideshowInterval);
    
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
          <span class="popup-close" onclick="closePopup()">&times;</span>
          <img src="${images[index]}" class="popup-image" />
        `;
    
        document.body.appendChild(popup);
      }
     
      
      function nextSlide() {
        showSlide(currentIndex + 1);
      }
  
      // Automatically switch to the next slide every 3 seconds
      setInterval(nextSlide, 3000);
  
      // Initially show the first slide
      showSlide(currentIndex);
  
    } else {
      productDetailsElement.innerHTML = '<p>Product not found.</p>';
    }
  };

  // Display product details when the page loads
  displayProductDetails();
 