let url_1,url_2, apiKey_1, apiKey_2;

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

    url_1 = config.URL_1;
    url_2 = config.URL_2;
    apiKey_1 = config.API_KEY_1;
    apiKey_2 = config.API_KEY_2;

  })
  .catch(error => {
    console.error('Error:', error);
  });



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

// GET Request
fetch(url_1, {
  headers: {
    'Authorization': apiKey_1
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

  areaChartOptionsTemp.series[0].data = data.temperatureData.map(entry => entry.temperature);
  areaChartOptionsTemp.xaxis.categories = data.temperatureData.map(entry => entry.hour);

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

fetch(url_2, {
  headers: {
    'Authorization': apiKey_2
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
  
  areaChartOptionsSoilMoisture.series[0].data = data.soilMoistureData.map(entry => entry.soilmoisture);
  areaChartOptionsSoilMoisture.xaxis.categories = data.soilMoistureData.map(entry => entry.hour);

  areaChartSoilMoisture.render();
})
.catch(error => {
  console.error('Error fetching data:', error);
});


const messageElement = document.getElementById('sugesstion');

const message = "New Sugg1estion";

messageElement.textContent = message;


function updateSoilChart() {
  var selectedDay = document.getElementById('soil-dropdown').value;
  console.log(selectedDay);

}

function updateTempChart() {
  var selectedDay = document.getElementById('temp-dropdown').value;
  console.log(selectedDay);

}
