document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Perform validation
    if (username === 'admin' && password === 'password') {
      alert('Login successful');
      window.location.href = "dashboard.html";
      // Redirect to dashboard or perform any desired action
    } else {
      alert('Invalid username or password');
    }
  });
  