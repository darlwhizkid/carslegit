const API_URL = 'https://carslegit.onrender.com';

async function handleSignup(event) {
  event.preventDefault();

  // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const fullName = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;
  const state = document.getElementById('state').value;
  const referral = document.getElementById('referral').value;

  // Basic validation
  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  const formData = {
      email,
      password,
      fullName,
      phone,
      state,
      referral
  };

  try {
      const response = await fetch('https://carslegit.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (response.ok) {
          window.location.href = '/login.html';
      } else {
          throw new Error(data.message || 'Registration failed');
      }
  } catch (error) {
      console.error('Registration error:', error);
  }
}