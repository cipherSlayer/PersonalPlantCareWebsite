document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    //username und password aus index html bekommen
    var username_eingabe = document.getElementById('username').value;
    var password_eingabe = document.getElementById('password').value;
  
    

    const data = {
      username: username_eingabe,
      password: password_eingabe
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
    
  });


  
  