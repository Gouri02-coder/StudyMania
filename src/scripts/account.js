// account.js
document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    checkLoginStatus();
    
    // Toggle dropdown
    const accountBtn = document.querySelector('.account-btn');
    if (accountBtn) {
      accountBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('.dropdown-content').classList.toggle('show');
      });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      const dropdowns = document.querySelectorAll('.dropdown-content');
      dropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        }
      });
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser();
      });
    }
  });
  
  function checkLoginStatus() {
    const userData = JSON.parse(localStorage.getItem('studyhub_user'));
    
    if (userData) {
      // User is logged in
      document.body.classList.add('logged-in');
      document.body.classList.remove('logged-out');
      
      // Update account dropdown info
      document.getElementById('username-display').textContent = userData.name.split(' ')[0]; // First name
      document.getElementById('dropdown-username').textContent = userData.name;
      document.getElementById('dropdown-email').textContent = userData.email;
      
      // Update profile picture if available
      if (userData.profilePic) {
        document.getElementById('profile-pic').src = userData.profilePic;
      }
    } else {
      // User is logged out
      document.body.classList.add('logged-out');
      document.body.classList.remove('logged-in');
    }
  }
  
  function logoutUser() {
    localStorage.removeItem('studyhub_user');
    checkLoginStatus();
    window.location.href = 'index.html';
  }