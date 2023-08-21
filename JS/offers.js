var firebaseConfig = {
    apiKey: "AIzaSyCOA_2bf_b1o1nXSHZO5Re5DjSD66Pa6MY",
    authDomain: "https://raona0-default-rtdb.firebaseio.com",
    projectId: "raona0",
    storageBucket: "raona0.appspot.com",
    messagingSenderId: "797719983777",
    appId: "1:797719983777:web:d7ffca1316891b51ec62e0"
  };
// Initialize Firebase
// Your firebaseConfig here
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const notificationsList = document.getElementById("notificationsList");

firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    await fetchMessages(user);
  } else {
    console.log("User not authenticated.");
  }
});

async function fetchMessages(user) {
  const messagesRef = db.collection("messages");
  const snapshot = await messagesRef.orderBy("timestamp", "desc").get();

  snapshot.forEach((doc) => {
    const messageData = doc.data();
    if (messageData.userId === user.uid) {
      const notificationItem = document.createElement("div");
      notificationItem.classList.add("notification-item");
      notificationItem.innerHTML = `
      
        <h3>${messageData.message}</h3>
      `;
      notificationsList.appendChild(notificationItem);
    }
  });
}
