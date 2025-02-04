function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Add your authentication logic here
  // If login is successful:
  localStorage.setItem("userName", username);
  window.location.href = "index.html";
}
