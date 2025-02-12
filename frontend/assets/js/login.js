document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = 'home.html';
    } else {
      // Handle login error - show message to user
      alert(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
});