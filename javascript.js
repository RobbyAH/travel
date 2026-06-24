// ===============================
// SLIDER FUNCTIONALITY
// ===============================

let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const thumbnails = document.querySelectorAll(".thumbnail");
const indicators = document.querySelectorAll(".indicator-dot");
const totalSlides = slides.length;
let autoSlideInterval;

// Initialize slider
function initSlider() {
  if (totalSlides > 0) {
    showSlide(currentSlideIndex);
    startAutoSlide();
  }
}

// Show specific slide
function showSlide(index) {
  // Hide all slides
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "prev");
    if (i === index) {
      slide.classList.add("active");
    } else if (i < index) {
      slide.classList.add("prev");
    }
  });

  // Update thumbnails
  thumbnails.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });

  // Update slide content animations
  const activeSlide = slides[index];
  const content = activeSlide?.querySelector(".slide-content");
  const locationTag = activeSlide?.querySelector(".location-tag");

  if (content) {
    content.style.animation = "none";
    setTimeout(() => {
      content.style.animation = "";
    }, 10);
  }

  if (locationTag) {
    locationTag.style.animation = "none";
    setTimeout(() => {
      locationTag.style.animation = "";
    }, 10);
  }

  currentSlideIndex = index;
}

// Change slide (next/prev)
function changeSlide(direction) {
  let newIndex = currentSlideIndex + direction;

  if (newIndex >= totalSlides) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = totalSlides - 1;
  }

  showSlide(newIndex);
  resetAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
  showSlide(index - 1);
  resetAutoSlide();
}

// Auto slide functionality
function startAutoSlide() {
  if (totalSlides > 1) {
    autoSlideInterval = setInterval(() => {
      changeSlide(1);
    }, 6000); // Change slide every 6 seconds
  }
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// ===============================
// NAVIGATION MENU
// ===============================

function initMenu() {
  const tombolMenu = $(".tombol-menu");
  const menu = $("nav .menu ul");

  function setupMobileMenu() {
    tombolMenu.off("click").on("click", function () {
      menu.toggle();
    });

    menu.off("click").on("click", function () {
      menu.toggle();
    });
  }

  // Initial setup
  $(document).ready(function () {
    const width = $(window).width();
    if (width < 990) {
      setupMobileMenu();
    }
  });

  // Handle window resize
  $(window).resize(function () {
    const width = $(window).width();
    if (width > 989) {
      menu.css("display", "block");
    } else {
      menu.css("display", "none");
    }
    setupMobileMenu();
  });
}

// ===============================
// SCROLL EFFECTS
// ===============================

function initScrollEffects() {
  $(document).ready(function () {
    let scrollPos = 0;

    $(document).scroll(function () {
      scrollPos = $(this).scrollTop();
      const nav = $("nav");
      const blackImg = $("nav img.hitam");
      const whiteImg = $("nav img.putih");

      if (scrollPos > 0) {
        nav.addClass("putih");
        blackImg.show();
        whiteImg.hide();
      } else {
        nav.removeClass("putih");
        blackImg.hide();
        whiteImg.show();
      }
    });
  });
}

// ===============================
// GALLERY FUNCTIONALITY
// ===============================

function initGallery() {
  const gallery = document.getElementById("gallery");
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (!gallery || !leftBtn || !rightBtn) return;

  const scrollStep = 260;
  const scrollInterval = 3000;
  let autoScrollTimer;

  // Button event listeners
  leftBtn.addEventListener("click", () => {
    gallery.scrollLeft -= scrollStep;
  });

  rightBtn.addEventListener("click", () => {
    gallery.scrollLeft += scrollStep;
  });

  // Auto scroll function
  function autoScroll() {
    if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth) {
      gallery.scrollLeft = 0;
    } else {
      gallery.scrollLeft += scrollStep;
    }
  }

  // Start auto scroll
  function startGalleryAutoScroll() {
    autoScrollTimer = setInterval(autoScroll, scrollInterval);
  }

  // Stop auto scroll on interaction
  function stopGalleryAutoScroll() {
    clearInterval(autoScrollTimer);
  }

  // Add interaction event listeners
  [gallery, leftBtn, rightBtn].forEach((el) => {
    el.addEventListener("mousedown", stopGalleryAutoScroll);
    el.addEventListener("touchstart", stopGalleryAutoScroll);
  });

  // Initialize gallery auto scroll
  startGalleryAutoScroll();
}

// ===============================
// EVENT LISTENERS
// ===============================

// Keyboard navigation for slider
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (e.key === "ArrowRight") {
    changeSlide(1);
  }
});

// Touch/swipe support for mobile slider
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      changeSlide(1);
    } else {
      // Swipe right - previous slide
      changeSlide(-1);
    }
  }
}

// Pause auto-slide on hover
function initSliderHoverControls() {
  const sliderContainer = document.querySelector(".slider-container");

  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);
  }
}

// Handle visibility change (pause when tab is not active)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoSlide();
  } else {
    startAutoSlide();
  }
});

// ===============================
// INITIALIZATION
// ===============================

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initGallery();
  initSliderHoverControls();
});

// Initialize jQuery-dependent functions
$(document).ready(() => {
  initMenu();
  initScrollEffects();
});
