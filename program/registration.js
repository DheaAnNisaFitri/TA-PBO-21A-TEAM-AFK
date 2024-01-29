document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registration-form");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Add your validation logic here if needed

    // Get form data
    const fullName = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Display the form data (for demonstration purposes)
    console.log("Full Name:", fullName);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // You can add code here to send the form data to a server for registration
    // For now, we'll just display an alert
    alert("Registration successful!");
  });
});
