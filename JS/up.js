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

// Function to handle form submission and Firebase upload
const handleFormSubmit = async (formData) => {
  const productName = formData.get('productName');
  const productDesc = formData.get('productDesc');
  const mainImageURL = formData.get('mainImage');

  // Specifications
  const spec1 = formData.get('spec1');
  const spec3 = formData.get('spec3');
  const spec4 = formData.get('spec4');
  const spec2 = formData.get('spec2');
  const wimage1 = formData.get('image1');
  const wimage2 = formData.get('image2');
  const wimage3 = formData.get('image3');
  const wimage4 = formData.get('image4');

  // Product Details
  const detail1 = formData.get('detail1');
  const detail2 = formData.get('detail2');
  const detail3 = formData.get('detail3');
  const detail4 = formData.get('detail4');
  const detail5 = formData.get('detail5');

  // Price
  const price = parseFloat(formData.get('price'));
  const discount = parseFloat(formData.get('discount'));
  const originalPrice = price+discount;

  // Shipping Charges
  const shippingCharges = parseFloat(formData.get('shippingCharges'));

  // Store the product data in Firestore
  const user = auth.currentUser;
  if (user) {
    await db.collection('products').add({
      userId: user.uid,
      name: productName,
      description: productDesc,
      mainImage: mainImageURL,
      spec1,
      spec2,
      spec3,
      spec4,
      detail1,
      detail2,
      detail3,
      detail4,
      detail5,
      price,
      discount,
      originalPrice,
      shippingCharges,
      image1 : wimage1,
      image2 : wimage2,
      image3 : wimage3,
      image4 : wimage4,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Show success message with SweetAlert
    await Swal.fire({
      icon: 'success',
      title: 'Product Uploaded!',
      text: 'Your product has been successfully uploaded.',
    });

    // Clear the form after successful upload
    document.getElementById('productForm').reset();
  } else {
    // Show error message with SweetAlert if user is not authenticated
    await Swal.fire({
      icon: 'error',
      title: 'Authentication Required',
      text: 'You need to sign in to upload products.',
    });
  }
};

// Handle form submission when the "Create Product" button is clicked
const createProductButton = document.getElementById('createProductButton');
createProductButton.addEventListener('click', async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Create Product',
    html: `
      <form id="productForm">
        <label for="productName">Product Name:</label>
        <input type="text" name="productName" id="productName" required>

        <label for="productDesc">Product Description:</label>
        <textarea name="productDesc" id="productDesc" required></textarea>

        <label for="mainImage">Main Image URL:</label>
        <input type="url" name="mainImage" id="mainImage" required>

        <label for="productImages1">Product Image1 URLs (one URL per line):</label>
<input name="image1" id="image1" required>

<label for="productImages2">Product Image2 URLs (one URL per line):</label>
<input name="image2" id="image2" required>

<label for="productImages3">Product Image3 URLs (one URL per line):</label>
<input name="image3" id="image3" required>

<label for="productImages4">Product Image4 URLs (one URL per line):</label>
<input name="image4" id="image4" required>

        <label for="spec1">Specification 1:</label>
        <input type="text" name="spec1" id="spec1" required>

        <label for="spec2">Specification 2:</label>
        <input type="text" name="spec2" id="spec2" required>

        <label for="spec3">Specification 3:</label>
        <input type="text" name="spec3" id="spec3" required>

        <label for="spec4">Specification 4:</label>
        <input type="text" name="spec4" id="spec4" required>

        <label for="detail1">Product Detail 1:</label>
        <input type="text" name="detail1" id="detail1" required>

        <label for="detail2">Product Detail 2:</label>
        <input type="text" name="detail2" id="detail2" required>

        <label for="detail3">Product Detail 3:</label>
        <input type="text" name="detail3" id="detail3" required>

        <label for="detail4">Product Detail 4:</label>
        <input type="text" name="detail4" id="detail4" required>

        <label for="detail5">Product Detail 5:</label>
        <input type="text" name="detail5" id="detail5" required>
        
        <label for="price">Price:</label>
        <input type="number" step="0.01" name="price" id="price" required>

        <label for="discount">Discount:</label>
        <input type="number" step="0.01" name="discount" id="discount" required>

        <label for="shippingCharges">Shipping Charges:</label>
        <input type="number" step="0.01" name="shippingCharges" id="shippingCharges" required>
      </form>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const formData = new FormData(document.getElementById('productForm'));
      return handleFormSubmit(formData);
    },
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Create',
    confirmButtonColor: '#007bff',
  });
});
