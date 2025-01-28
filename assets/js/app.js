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