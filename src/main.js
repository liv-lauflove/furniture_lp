const navBtn = document.querySelector('#menu');
const menuBar = document.querySelector('[role="menubar"]');

navBtn.addEventListener('click', () => {
    const isExpanded =JSON.parse(navBtn.getAttribute('aria-expanded'));
    navBtn.setAttribute('aria-expanded', !isExpanded);
    menuBar.classList.toggle('hidden');
    menuBar.classList.toggle('flex');
})

 // Image Slider Auto 3 detik + Manual
  const slider = document.getElementById('about-slider');
  const images = slider.querySelectorAll('.slider-img');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let autoSlideInterval;

  function showSlide(index) {
    // Hide semua
    images.forEach((img, i) => img.classList.remove('opacity-100'));
    dots.forEach((dot, i) => dot.classList.remove('active'));
    
    // Show current
    images[index].classList.add('opacity-100');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
    showSlide(currentSlide);
  }

  // Auto slide setiap 3 detik
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
  }

  // Manual navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      showSlide(index);
      startAutoSlide(); // Restart auto
    });
  });

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  slider.addEventListener('mouseleave', startAutoSlide);

  // Init
  showSlide(0);
  startAutoSlide();


// buat best seller
// Infinite Scroll Functionality

document.addEventListener('DOMContentLoaded', function() {
  const scrollContainer = document.getElementById('infiniteScrollContainer');
  const scrollingContent = document.getElementById('scrollingContent');
  const scrollLeftBtn = document.getElementById('scrollLeft');
  const scrollRightBtn = document.getElementById('scrollRight');
  
  let scrollSpeed = 0.5; // pixels per frame
  let scrollDirection = 1; // 1 for right, -1 for left
  let isScrolling = true;
  let animationId;
  
  // Function to start auto scrolling
  function startAutoScroll() {
    function animate() {
      if (isScrolling) {
        scrollContainer.scrollLeft += scrollSpeed * scrollDirection;
        
        // Reset to beginning when reaching the end (with seamless loop)
        if (scrollContainer.scrollLeft >= scrollingContent.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = scrollingContent.scrollWidth / 2;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Pause scrolling on hover
  scrollContainer.addEventListener('mouseenter', () => {
    isScrolling = false;
  });
  
  // Resume scrolling when mouse leaves
  scrollContainer.addEventListener('mouseleave', () => {
    isScrolling = true;
  });
  
  // Manual scroll controls
  scrollLeftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
  });
  
  scrollRightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  scrollContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isScrolling = false;
  });
  
  scrollContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    setTimeout(() => { isScrolling = true; }, 2000);
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swipe left
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      } else {
        // Swipe right
        scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  }
  
  // Start auto-scroll
  startAutoScroll();
  
  // Clean up animation frame on page unload
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
  });
});