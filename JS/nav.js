function home() {
    window.location.href = 'home.html'
}
function orders() {
    window.location.href = 'orders.html'
}
function offers() {
    window.location.href = 'offers.html'
}
function support() {
    window.location.href = 'support.html'
}
function profile() {
    window.location.href = 'profile.html'
}
function hsearch() {
    window.location.href = 'search.html'
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