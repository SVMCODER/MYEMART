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
      
      // Include the image URL if available
      let imageElement = "";
      if (messageData.imageURL) {
        imageElement = `<img src="${messageData.imageURL}" alt="Message Image" class="message-image">`;
      }
      
      notificationItem.innerHTML = `
        ${imageElement}
        <h3>${messageData.message}</h3>
        <p>${messageData.timestamp}</p>
      `;
      notificationsList.appendChild(notificationItem);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
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
