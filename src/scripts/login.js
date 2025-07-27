document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // In a real app, you would validate and send to server
  // For demo, we'll simulate a successful login
  
  // Get existing users from localStorage
  const users = JSON.parse(localStorage.getItem('studyhub_users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Store user data in localStorage
    localStorage.setItem('studyhub_user', JSON.stringify(user));
    
    // Redirect to home page
    window.location.href = 'index.html';
  } else {
    alert('Invalid email or password');
  }
});