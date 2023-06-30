var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

var areaChartTemp, areaChartOptionsTemp;

var areaChartSoilMoisture, areaChartOptionsSoilMoisture;

var areaChartTempHour, areaChartOptionsTempHour;

var areaChartHumidityHour, areaChartOptionsHumidityHour;

var url_temp_hour_g, api_key_1_g;

async function fetchData() {
  try {
    const response = await fetch('config.txt');
    const data = await response.text();

    const lines = data.split('\n');
    const config = {};

    lines.forEach(line => {
      const match = line.match(/^\s*([\w.]+)\s*=\s*"(.*)"/);
      if (match) {
        const key = match[1];
        const value = match[2];
        config[key] = value;
      }
    });

    const url_temp_day = config.url_temp_day;
    const url_soilmoisture_day = config.url_soilmois_day;
    const url_temp_hour = config.url_temp_hour;
    url_temp_hour_g = config.url_temp_hour;
    api_key_1_g = config.api_key_1;
    const api_key_1 = config.api_key_1;
    const url_recommendation = config.url_recommendation;

    console.log(url_temp_day);
    console.log(api_key_1);

    fill_first_graph(url_temp_day, api_key_1);
    fill_top_left_graph(url_soilmoisture_day,api_key_1);

    //fill_bottom_left_graph(url_temp_hour, 12, api_key_1);

    //fill_bottom_right_graph(url_temp_hour, selectedDay, api_key_1_g);

    display_recommendation(url_recommendation, api_key_1);

  } catch (error) {
    console.error('Error:', error);
  }
}

function fill_first_graph(url, apiKey) {
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const url_to_fetch = `${url}/${currentDayOfMonth}/${currentMonth}/${currentYear}`;

  areaChartOptionsTemp = {
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
  fetch(url_to_fetch, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Issue');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.temperatureData)) {
        throw new Error('Not appropriate JSON Format');
      }

      areaChartOptionsTemp.series[0].data = data.temperatureData.map(entry => entry.temperature);
      areaChartOptionsTemp.xaxis.categories = data.temperatureData.map(entry => entry.hour);

      areaChartTemp.updateOptions(areaChartOptionsTemp);
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}


function fill_top_left_graph(url, apiKey) {
  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; //jauar ist 0 nicht 1
  const currentYear = currentDate.getFullYear();

  const url_to_fetch = `${url}/${currentDayOfMonth}/${currentMonth}/${currentYear}`;

  areaChartOptionsSoilMoisture = {
    series: [{
      name: 'SoilMoisture',
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
        text: 'SoilMoisture'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
    }
  };

  var areaChartSoilMoisture = new ApexCharts(document.querySelector("#chart-soil"), areaChartOptionsSoilMoisture);
  areaChartSoilMoisture.render();

  // GET Request
  fetch(url_to_fetch, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Issue');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.soilMoistureData)) {
        throw new Error('Not appropriate JSON Format');
      }

      areaChartOptionsSoilMoisture.series[0].data = data.soilMoistureData.map(entry => entry.soilmoisture);
      areaChartOptionsSoilMoisture.xaxis.categories = data.soilMoistureData.map(entry => entry.hour);

      areaChartSoilMoisture.updateOptions(areaChartOptionsSoilMoisture);
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function display_recommendation(url, apiKey){

  fetch(url, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Issue');
      }
      return response.json();
    })
    .then(data => {
      const recommendation = data.recommendation;

      const messageElement = document.getElementById('sugesstion');

      messageElement.textContent = recommendation;
  
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}

function fill_bottom_left_graph(url, hour, apiKey){

  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; //jauar ist 0 nicht 1
  const currentYear = currentDate.getFullYear();

  const url_to_fetch = `${url}/${hour}/${currentDayOfMonth}/${currentMonth}/${currentYear}`;

  console.log(url_to_fetch);

  areaChartOptionsTempHour = {
    series: [{
      name: 'Temp-Hour',
      data: []
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#1c7ab0"],
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
        text: 'Tempearture'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
    }
  };

  var areaChartTempHour = new ApexCharts(document.querySelector("#chart-temp-hour"), areaChartOptionsTempHour);
  areaChartTempHour.render();

  // GET Request
  fetch(url_to_fetch, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Issue');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.temperatureData)) {
        throw new Error('Not appropriate JSON Format');
      }

      areaChartOptionsTempHour.series[0].data = data.temperatureData.map(entry => entry.temperature);
      areaChartOptionsTempHour.xaxis.categories = data.temperatureData.map(entry => entry.hour);

      areaChartTempHour.updateOptions(areaChartOptionsTempHour);
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}


function fill_bottom_right_graph(url, hour, apiKey){

  const currentDate = new Date();
  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1; //jauar ist 0 nicht 1
  const currentYear = currentDate.getFullYear();

  const url_to_fetch = `${url}/${hour}/${currentDayOfMonth}/${currentMonth}/${currentYear}`;

  console.log(url_to_fetch);

  areaChartOptionsHumidityHour = {
    series: [{
      name: 'Humidity-Hour',
      data: []
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#d1c21f"], 
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
        text: 'Humidity'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
    }
  };

  var areaChartHumidityHour = new ApexCharts(document.querySelector("#chart-humidity-hour"), areaChartOptionsHumidityHour);
  areaChartHumidityHour.render();

  // GET Request
  fetch(url_to_fetch, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network Issue');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.temperatureData)) {
        throw new Error('Not appropriate JSON Format');
      }

      areaChartOptionsHumidityHour.series[0].data = data.temperatureData.map(entry => entry.humidity);
      areaChartOptionsHumidityHour.xaxis.categories = data.temperatureData.map(entry => entry.hour);

      areaChartHumidityHour.updateOptions(areaChartOptionsHumidityHour);
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}





fetchData();

//----------


function updateSoilChart() {
  var selectedDay = document.getElementById('soil-dropdown').value;
  console.log(selectedDay);

}

function updateTempChart() {
  var selectedDay = document.getElementById('temp-dropdown').value;
  console.log(selectedDay);
}

function updateTempHourChart() {
  var selectedDay = document.getElementById('temp-hour-dropdown').value;
  console.log(selectedDay);

  fill_bottom_left_graph(url_temp_hour_g, selectedDay, api_key_1_g);
}

function updateHumidityHourChart() {
  var selectedDay = document.getElementById('humidity-hour-dropdown').value;
  console.log(selectedDay);

  fill_bottom_right_graph(url_temp_hour_g, selectedDay, api_key_1_g);
}