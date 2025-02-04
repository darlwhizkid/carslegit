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
document.addEventListener("DOMContentLoaded", () => {
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

// Quick Action Buttons
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add your action handling logic here
        console.log('Action clicked:', this.textContent.trim());
    });
});

// Renewal Alert Buttons
document.querySelectorAll('.alert-item button').forEach(btn => {
    btn.addEventListener('click', function() {
        // Add renewal handling logic here
        console.log('Renewal initiated');
    });
});

// Vehicle Card Interaction
document.querySelectorAll('.vehicle-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add vehicle details view logic here
        console.log('Vehicle details clicked');
    });
});


// Modal functionality
const newVehicleBtn = document.querySelector('.action-btn');
const modal = document.getElementById('newVehicleModal');
const closeModal = document.querySelector('.close-modal');
const typeOptions = document.querySelectorAll('.type-option');
const uploadBoxes = document.querySelectorAll('.upload-box');

newVehicleBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Vehicle type selection
typeOptions.forEach(option => {
    option.addEventListener('click', () => {
        typeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// File upload handling
uploadBoxes.forEach(box => {
    const input = box.querySelector('input[type="file"]');
    box.addEventListener('click', () => input.click());
    
    input.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            box.style.borderColor = '#28a745';
            box.querySelector('span').textContent = e.target.files[0].name;
        }
    });
});

