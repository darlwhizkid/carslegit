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

  try {
      const response = await fetch(`${process.env.FRONTEND_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email,
              password,
              fullName,
              phone,
              state,
              referral
          }),
      });

      const data = await response.json();

      if (response.ok) {
          alert('Registration successful! Please check your email for verification.');
          // Switch back to login form
          document.getElementById('loginForm').style.display = 'block';
          document.getElementById('signupForm').style.display = 'none';
      } else {
          alert(data.message);
      }
  } catch (error) {
      alert('An error occurred during registration. Please try again.');
  }
}