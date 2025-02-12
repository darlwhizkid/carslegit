// Date function
function updateDate() {
  const dateDisplay = document.querySelector(".date-display");
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  dateDisplay.innerHTML = `
        <span class="day">${day}</span>
        <div class="month-year">
            <span>${month},</span>
            <span>${year}</span>
        </div>
    `;
}

// Update date immediately and then every second
updateDate();
setInterval(updateDate, 1000);

// Mobile view navbar
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navItems = document.querySelector(".nav-items");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navItems.classList.toggle("active");
  });
});


// FAQ functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
            // Toggle current FAQ
            item.classList.toggle("active");

            // Close other FAQs
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });
        });
    });
});

// Scroll functionality
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  scrollBtn.innerHTML = '<i class="fas fa-car"></i>';
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  setTimeout(() => {
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  }, 1000);
});


// For the modal functionality

function showLoginModal() {
  document.getElementById("loginModal").classList.add("show");
}

function hideLoginModal() {
  document.getElementById("loginModal").classList.remove("show");
}

// Login form handling
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "darlculus" && password === "Coldwizkid1#") {
    localStorage.setItem("userName", username);
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials. Please try again.");
  }
}

// Modal form handling
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login-btn");
  const registerBtn = document.querySelector(".register-btn");
  const closeBtn = document.querySelector(".close-btn");
  const togglePassword = document.querySelector("#togglePassword");
  const passwordInput = document.querySelector("#password");
  const signUpBtn = document.querySelector(".button2");
  console.log("Found button:", signUpBtn);
  const backToLoginBtn = document.querySelector("#backToLogin");
  console.log("Found back button:", backToLoginBtn);
  const forgotPasswordBtn = document.querySelector(".button3");

  loginBtn?.addEventListener("click", showLoginModal);
  registerBtn?.addEventListener("click", showLoginModal);
  closeBtn?.addEventListener("click", hideLoginModal);
  signUpBtn.addEventListener("click", function () {
    console.log("Button clicked");
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
  });
   backToLoginBtn.addEventListener("click", function () {
     document.getElementById("signupForm").style.display = "none";
     document.getElementById("loginForm").style.display = "block";
   });
   forgotPasswordBtn.addEventListener("click", function () {
     document.getElementById("loginForm").style.display = "none";
     document.getElementById("forgotPasswordForm").style.display = "block";
   });
   document
     .getElementById("backToLoginFromReset")
     .addEventListener("click", function () {
       document.getElementById("forgotPasswordForm").style.display = "none";
       document.getElementById("loginForm").style.display = "block";
     });

  // Close modal when clicking outside
  document
    .getElementById("loginModal")
    ?.addEventListener("click", function (e) {
      if (e.target === this) {
        hideLoginModal();
      }
    });

  // Toggle password visibility
  togglePassword?.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
  });
});

// Form switching
document.querySelector(".button2")?.addEventListener("click", function () {
  console.log("Button clicked");
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});

document.getElementById("backToLogin").addEventListener("click", function () {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// Signup handling
function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  console.log("Signup:", { username, password });
  // Add your signup logic here
}
