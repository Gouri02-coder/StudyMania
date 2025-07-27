document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // Validate passwords match
  if (password !== document.getElementById('confirm-password').value) {
    alert('Passwords do not match');
    return;
  }
  
  // Check if terms are accepted
  if (!document.getElementById('terms').checked) {
    alert('You must accept the terms and conditions');
    return;
  }
  
  // Create user object
  const user = {
    name: name,
    email: email,
    password: password, // In a real app, you would hash this
    joinDate: new Date().toISOString(),
    profilePic: 'default-profile.jpg'
  };
  
  // Get existing users
  let users = JSON.parse(localStorage.getItem('studyhub_users')) || [];
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    alert('Email already registered');
    return;
  }
  
  // Add new user
  users.push(user);
  localStorage.setItem('studyhub_users', JSON.stringify(users));
  
  // Log the user in
  localStorage.setItem('studyhub_user', JSON.stringify(user));
  
  // Redirect to home page
  window.location.href = 'index.html';
});