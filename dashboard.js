const ul = document.getElementById('navigation');
const listItems = ul.getElementsByTagName('li');
    
// Loop through the NodeList object.
for (let i = 0; i <= listItems.length - 1; i++) {
    console.log (listItems[i]);
}


document.getElementById('navigation').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    var clickedItem = event.target;
    window.location.href = clickedItem;

    
  });


// Data in JSON format
var jsonData = {
    dataset1: [10, 20, 30, 40, 50,30,5, 15, 25, 35, 45,30],
    dataset2: [5, 15, 25, 35, 45,30,5, 15, 25, 35, 45,30]
  };
  
  // Create first chart
  var ctx1 = document.getElementById('chart1').getContext('2d');
  var chart1 = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: ['A', 'B', 'C', 'D', 'E','A', 'B', 'C', 'D', 'E','Z','A', 'B', 'C', 'D', 'E','A', 'B', 'C', 'D', 'E','Z'],
      datasets: [{
        label: 'Dataset 1',
        data: jsonData.dataset1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: false
    }
  });
  
  // Create second chart
  var ctx2 = document.getElementById('chart2').getContext('2d');
  var chart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [{
        label: 'Dataset 2',
        data: jsonData.dataset2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: false
    }
  });
  

  document.getElementById('toggleButton').addEventListener('click', function() {
    var chart1Container = document.getElementById('chart1Container');
    var chart2Container = document.getElementById('chart2Container');
    
    if (chart1Container.style.display === 'none') {
      chart1Container.style.display = 'block';
      chart2Container.style.display = 'block';
    } else {
      chart1Container.style.display = 'none';
      chart2Container.style.display = 'none';
    }
  });
  

  var toggleButton = document.getElementById('toggleButton');

  toggleButton.addEventListener('click', function() {
    // Fetch the JSON data
    alert('Login successful');
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        var phrase = data.phrase;
        alert(phrase);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  