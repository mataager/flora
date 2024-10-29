// Email and Password Sign-In Prompt
function emailPasswordSignIn() {
  Swal.fire({
    title: "Sign in with Email & Password",
    html: `
      <input type="email" id="email" class="swal2-input" placeholder="Enter your email">
      <input type="password" id="password" class="swal2-input" placeholder="Enter your password">
    `,
    showCancelButton: true,
    confirmButtonText: "Sign In",
    preConfirm: () => {
      const email = Swal.getPopup().querySelector("#email").value;
      const password = Swal.getPopup().querySelector("#password").value;

      if (!email || !password) {
        Swal.showValidationMessage("Please enter both email and password");
        return false;
      }
      return { email, password };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { email, password } = result.value;
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          Swal.fire({
            icon: "success",
            title: "Signed In Successfully",
            text: `Welcome, ${userCredential.user.email}`,
          });

          // Hide the email sign-in button on success
          document.getElementById("email-signin-btn").style.display = "none";
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Sign In Failed",
            text: error.message,
          });
        });
    }
  });
}
