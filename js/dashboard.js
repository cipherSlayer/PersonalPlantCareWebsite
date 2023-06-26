// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

var areaChartOptionsTemp = {
  series: [{
    name: 'Temperature',
    data: []
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ["#b01c1f"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: [],
    title: {
      text: 'Hour'
    }
  },
  yaxis: {
    title: {
      text: 'Temperature'
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
  }
};

var areaChartTemp = new ApexCharts(document.querySelector("#chart-temp"), areaChartOptionsTemp);
areaChartTemp.render();

// Make a GET request to the REST API endpoint
fetch('https://iotplantcare-e4290a52c869.herokuapp.com/getTemperature/21/6/2023', {
  headers: {
    'Authorization': 'api_key_for_tempMeasuring'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  if (!Array.isArray(data.temperatureData)) {
    throw new Error('Invalid data format received from the API');
  }

  // Update the series data with the fetched data
  areaChartOptionsTemp.series[0].data = data.temperatureData.map(entry => entry.temperature);
  areaChartOptionsTemp.xaxis.categories = data.temperatureData.map(entry => entry.hour);

  // Render the updated chart
  areaChartTemp.render();
})
.catch(error => {
  console.error('Error fetching data:', error);
});






//Soil Moisture Graph




var areaChartOptionsSoilMoisture = {
  series: [{
    name: 'soilmoisture',
    data: []
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  colors: ["#b01c1f"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: [],
    title: {
      text: 'Hour'
    }
  },
  yaxis: {
    title: {
      text: 'soilMoisture'
    }
  },
  tooltip: {
    shared: true,
    intersect: false,
  }
};


var areaChartSoilMoisture = new ApexCharts(document.querySelector("#chart-soil"), areaChartOptionsSoilMoisture);
areaChartSoilMoisture.render();

//To Do : Fetch current day / or selectd day from drop down

fetch('https://iotplantcare-e4290a52c869.herokuapp.com/getSoilMoisture/26/6/2023', {
  headers: {
    'Authorization': 'api_key_for_tempMeasuring'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  if (!Array.isArray(data.soilMoistureData)) {
    throw new Error('Invalid data format received from the API');
  }
  

  // Update the series data with the fetched data
  areaChartOptionsSoilMoisture.series[0].data = data.soilMoistureData.map(entry => entry.soilmoisture);
  areaChartOptionsSoilMoisture.xaxis.categories = data.soilMoistureData.map(entry => entry.hour);

  // Render the updated chart
  areaChartSoilMoisture.render();
})
.catch(error => {
  console.error('Error fetching data:', error);
});


//make a request to display a suggestion for the plants based on current values
const messageElement = document.getElementById('sugesstion');

// Define the message you want to insert dynamically
const message = "New Sugg1estion";

// Set the message text
messageElement.textContent = message;




// Update Soil Moisture chart based on selected day
function updateSoilChart() {
  var selectedDay = document.getElementById('soil-dropdown').value;
  console.log(selectedDay);
  // Call the appropriate API endpoint to fetch data for the selected day
  // Update the chart with the fetched data
  // Render the updated chart
}

// Update Temperature chart based on selected day
function updateTempChart() {
  var selectedDay = document.getElementById('temp-dropdown').value;
  console.log(selectedDay);
  // Call the appropriate API endpoint to fetch data for the selected day
  // Update the chart with the fetched data
  // Render the updated chart
}
