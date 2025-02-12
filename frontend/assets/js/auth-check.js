function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', checkAuth);
