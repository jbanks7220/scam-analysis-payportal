// main.js
// Global site script — safe for all pages

document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     MOBILE NAVIGATION
  =============================== */

  const mobileButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileButton && mobileMenu) {

    // Toggle menu
    mobileButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileMenu.contains(event.target) &&
        !mobileButton.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
      }
    });
  }


  /* ===============================
     CONTACT FORM SUBMISSION
  =============================== */

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      };

      try {
        const response = await fetch("/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        const status = document.getElementById("form-status");

        if (result.success) {
          status.textContent = "Message sent successfully.";
          status.classList.remove("text-red-400");
          status.classList.add("text-green-400");
          contactForm.reset();
        } else {
          status.textContent = "Something went wrong. Please try again.";
          status.classList.remove("text-green-400");
          status.classList.add("text-red-400");
        }

      } catch (error) {
        console.error("Contact form error:", error);

        const status = document.getElementById("form-status");
        if (status) {
          status.textContent = "Server error. Please try again later.";
          status.classList.remove("text-green-400");
          status.classList.add("text-red-400");
        }
      }
    });
  }


  /* ===============================
     FAQ TOGGLE (if exists)
  =============================== */

  const faqButtons = document.querySelectorAll(".faq-toggle");

  if (faqButtons.length > 0) {
    faqButtons.forEach(button => {
      button.addEventListener("click", function () {
        const content = this.nextElementSibling;
        if (content) {
          content.classList.toggle("hidden");
        }
      });
    });
  }


  /* ===============================
     SMOOTH SCROLL FOR ANCHOR LINKS
  =============================== */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId.length > 1) {
        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });


  /* ===============================
     HERO SLIDESHOW
  =============================== */

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {

      slides[currentSlide].classList.remove("opacity-100");
      slides[currentSlide].classList.add("opacity-0");

      currentSlide = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.remove("opacity-0");
      slides[currentSlide].classList.add("opacity-100");

    }, 5000); // change slide every 5 seconds
  }

});
