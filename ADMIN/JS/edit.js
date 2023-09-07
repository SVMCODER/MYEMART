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
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('p');

  const productNameInput = document.getElementById('productName');
  const productPriceInput = document.getElementById('productPrice');
  const productRatingInput = document.getElementById('productRating');
  const productImageInput = document.getElementById('productImage');
  const productDescInput = document.getElementById('productDescription');
    const currentImage = document.getElementById('currentImage');

  const saveButton = document.getElementById('saveButton');

  const getProductData = async () => {
    document.getElementById('loadingMessage').innerHTML = '<div class="loading"></div>';

    try {
        const productDoc = await db.collection('products').doc(productId).get();
        document.getElementById('loadingMessage').innerHTML = `
         `;
        if (productDoc.exists) {
            document.getElementById('editProductForm').style.display = 'block'
            const productData = productDoc.data();
            
            productNameInput.value = productData.name || '';
            productPriceInput.value = productData.price || '';
            productRatingInput.value = productData.rating || '';
            productDescInput.value = productData.description || '';
            currentImage.src = productData.mainImage || '';

            // Clear the loading message
            
        } else {
            // Clear the loading message
            document.getElementById('loadingMessage').innerHTML = 'Product Not Found!';
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        // Clear the loading message
        document.getElementById('loadingMessage').innerHTML = 'An error occured!';
    }
};


  const uploadImageWithProgress = async () => {
    const imageFile = productImageInput.files[0];
    if (imageFile) {
        const storageRef = storage.ref(`product_images/${productId}`);
        const imageRef = storageRef.child(imageFile.name);

        try {
            const uploadTask = imageRef.put(imageFile);

            // Show a progress bar while uploading
            const uploadingSwal = Swal.fire({
                title: 'Uploading Image',
                text: 'Please wait...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Calculate and display the upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadingSwal.update({ text: `Uploading ${progress.toFixed(2)}%` });
                },
                (error) => {
                    console.error('Error uploading image:', error);
                    uploadingSwal.close();
                },
                async () => {
                    // Image upload completed
                    uploadingSwal.close();

                    const imageURL = await imageRef.getDownloadURL();
                    saveChangesWithImage(imageURL);
                }
            );
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                icon: 'error',
                title: 'Image Upload Error',
                text: 'An error occurred while uploading the image.',
            });
        }
    }
};

const saveChangesWithImage = async (imageURL) => {
    const updatedName = productNameInput.value;
    const updatedPrice = parseFloat(productPriceInput.value);
    const updatedRating = productRatingInput.value;
    const productDesc = productDescInput.value;

    if (!updatedName || isNaN(updatedPrice) || !updatedRating) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please enter valid data.',
        });
        return;
    }

    const updatedData = {
        name: updatedName,
        price: updatedPrice,
        rating: updatedRating,
        description: productDesc,
    };

    if (imageURL) {
        updatedData.mainImage = imageURL;
    }

    await db.collection('products').doc(productId).update(updatedData);

    Swal.fire({
        icon: 'success',
        title: 'Product Updated',
        text: 'Product data updated successfully.',
        confirmButtonText: 'OK',
    }).then(() => {
        // Redirect back to the product list page
        window.location.href = 'plist.html';
    });
};

const saveChanges = async () => {
    if (productImageInput.files[0]) {
        uploadImageWithProgress();
    } else {
        saveChangesWithImage(null);
    }
};
  window.onload = () => {
    getProductData()
      saveButton.addEventListener('click', saveChanges);
  };