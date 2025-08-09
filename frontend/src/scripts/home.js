document.addEventListener('DOMContentLoaded', function() {
  // Navbar animation on click
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');

  // Add click animation to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Add click animation
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 400);
      
      // Close mobile menu if open
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Mobile menu toggle
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('active');
  });

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop();
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

// Add this to your existing home.js
function setupLogout() {
  const logoutBtn = document.createElement('a');
  logoutBtn.href = '#';
  logoutBtn.className = 'nav-link';
  logoutBtn.innerHTML = '<span>Logout</span>';
  
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    window.location.href = 'login.html';
  });
  
  // Add logout button to navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.appendChild(logoutBtn);
  }
}

// Call this when page loads
document.addEventListener('DOMContentLoaded', function() {
  setupLogout();
  
  // Show user email if logged in
  const userEmail = sessionStorage.getItem('userEmail');
  if (userEmail) {
    const userGreeting = document.createElement('div');
    userGreeting.className = 'user-greeting';
    userGreeting.textContent = `Welcome, ${userEmail}`;
    document.querySelector('.header .container').appendChild(userGreeting);
  }
});