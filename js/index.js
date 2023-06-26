document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  var user_email = document.querySelector('input[type="text"]').value;
  var user_password = document.querySelector('input[type="password"]').value;

  if (user_email === '') {
    showError('Email can\'t be blank');
  } else if (user_password === '') {
    showError('Password can\'t be blank');
  } else {

    console.log('Email:', user_email);
    console.log('Password:', user_password);

    const data = {
      username: user_email,
      password: user_password
    };

    console.log(data);

    fetch('https://iotplantcare-e4290a52c869.herokuapp.com/checkPW', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'api_key_for_tempMeasuring'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('grant access');
      alert('Login successful');
    window.location.href = "dashboard.html";
    } else {
      console.log('Error:', response.statusText);
      alert('Invalid username or password');
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });
  





  }
});

// Funktion zum Anzeigen von Fehlermeldungen
function showError(errorMessage) {
  var errorText = document.querySelector('.error-txt');
  errorText.textContent = errorMessage;
  errorText.style.display = 'block';
}


