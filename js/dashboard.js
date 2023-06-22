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

var mockJsonSoil = {
  "soilmoistureData": [
    {
      "soilMoisture": 0.20,
      "hour": 0
    },
    {
      "hour": 1,
      "soilMoisture": 0.21
    },
    {
      "hour": 2,
      "soilMoisture": 0.22
    },
    {
      "hour": 3,
      "soilMoisture": 0.23
    },
    {
      "hour": 4,
      "soilMoisture": 0.24
    },
    {
      "hour": 5,
      "soilMoisture": 0.25
    },
    {
      "hour": 6,
      "soilMoisture": 0.26
    },
    {
      "hour": 7,
      "soilMoisture": 0.27
    },
    {
      "hour": 8,
      "soilMoisture": 0.28
    },
    {
      "hour": 9,
      "soilMoisture": 0.29
    },
    {
      "hour": 10,
      "soilMoisture": 0.30
    },
    {
      "hour": 11,
      "soilMoisture": 0.31
    },
    {
      "hour": 12,
      "soilMoisture": 0.32
    },
    {
      "hour": 13,
      "soilMoisture": 0.33
    },
    {
      "hour": 14,
      "soilMoisture": 0.34
    },
    {
      "hour": 15,
      "soilMoisture": 0.35
    },
    {
      "hour": 16,
      "soilMoisture": 0.36
    },
    {
      "hour": 17,
      "soilMoisture": 0.37
    },
    {
      "hour": 18,
      "soilMoisture": 0.38
    },
    {
      "hour": 19,
      "soilMoisture": 0.39
    },
    {
      "hour": 20,
      "soilMoisture": 0.32
    },
    {
      "hour": 20,
      "soilMoisture": 0.33
    },
    {
      "hour": 21,
      "soilMoisture": 0.34
    },
    {
      "hour": 22,
      "soilMoisture": 0.35
    },
    {
      "hour": 23,
      "soilMoisture": 0.36
    }
  ]
};


var areaChartOptions = {
  series: [{
    name: 'SoilMoisture',
    data: mockJsonSoil.soilmoistureData.map(function(entry) {
      return entry.soilMoisture;
    })
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
    categories: mockJsonSoil.soilmoistureData.map(function(entry) {
      return entry.hour;
    }),
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

var areaChart = new ApexCharts(document.querySelector("#chart-soil"), areaChartOptions);
areaChart.render();


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
