<<<<<<< HEAD
document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('Form submitted');
  
  try {
    console.log('Sending request to:', '/api/auth/register');
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

    console.log('Response:', response);
    const data = await response.json();
    console.log('Data:', data);
    
    if (response.ok) {
      alert('Please check your email for verification link');
      document.querySelector('.modal').style.display = 'none';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Registration error:', error);
  }
=======
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          fullName: document.getElementById('fullName').value,
          phone: document.getElementById('phone').value,
          state: document.getElementById('state').value,
          referral: document.getElementById('referral').value
      };

      try {
          const response = await fetch('http://localhost:5000/api/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });

          const data = await response.json();

          if (response.ok) {
              // Show success message
              document.getElementById('message').textContent = 'Registration successful! Please check your email for verification.';
              document.getElementById('message').className = 'success';
                
              // Redirect to verification pending page after 3 seconds
              setTimeout(() => {
                  window.location.href = '/verification-pending.html';
              }, 3000);
          } else {
              // Show error message
              document.getElementById('message').textContent = data.message || 'Registration failed';
              document.getElementById('message').className = 'error';
          }
      } catch (error) {
          document.getElementById('message').textContent = 'Server error. Please try again later.';
          document.getElementById('message').className = 'error';
      }
  });
>>>>>>> userlog
});