document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('signup-username').value,
        email: document.getElementById('signup-email').value,
        password: document.getElementById('signup-password').value
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Please check your email for verification link');
      // Close modal
      document.querySelector('.modal').style.display = 'none';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
});
