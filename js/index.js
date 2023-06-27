let url_pw, apiKey_pw;

fetch('config.txt')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n');
    const config = {};

    lines.forEach(line => {
      const parts = line.split('=');
      const key = parts[0].trim();
      const value = parts[1].trim();
      config[key] = value;
    });

    url_pw = config.URL_PW;
    apiKey_pw = config.API_KEY_PW;

  })
  .catch(error => {
    console.error('Error:', error);
  });




document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();

  var user_email = document.querySelector('input[type="text"]').value;
  var user_password = document.querySelector('input[type="password"]').value;

  if (user_email === '') {
    showError('Email can\'t be blank');
  } else if (user_password === '') {
    showError('Password can\'t be blank');
  } else {


    const data = {
      username: user_email,
      password: user_password
    };

    console.log(data);

    fetch(url_pw, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': apiKey_pw
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      console.log('grant access');
      window.location.href = "dashboard.html";
    } else {
      console.log('Error:', response.statusText);
      var errorTxt = document.querySelector('error error-txt');
      errorTxt.textContent = "Something wrent wrong";

    }
  })
  .catch(error => {
    console.log('Error:', error);
  });
  }
});

function showError(errorMessage) {
  var errorText = document.querySelector('.error-txt');
  errorText.textContent = errorMessage;
  errorText.style.display = 'block';
}


