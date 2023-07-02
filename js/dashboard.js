function calculateMean(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
}

function roundToTwoDecimalPlaces(value) {
  return +value.toFixed(2);
}

function calculateMeanValues(data) {
  const hourMap = {};

  for (const entry of data) {
    const { hour, humidity, temperature } = entry;
    if (hour in hourMap) {
      hourMap[hour].humidity.push(humidity);
      hourMap[hour].temperature.push(temperature);
    } else {
      hourMap[hour] = {
        humidity: [humidity],
        temperature: [temperature],
      };
    }
  }

  for (const hour in hourMap) {
    const meanHumidity = calculateMean(hourMap[hour].humidity);
    const meanTemperature = calculateMean(hourMap[hour].temperature);
    const entry = {
      hour: parseInt(hour),
      humidity: roundToTwoDecimalPlaces(meanHumidity),
      temperature: roundToTwoDecimalPlaces(meanTemperature),
    };
    hourMap[hour] = entry;
  }

  const updatedData = [];
  for (const hour in hourMap) {
    updatedData.push(hourMap[hour]);
  }

  return updatedData;
}

function calculateMeanSoilMoisture(data) {
  const hourMap = {};

  for (const entry of data) {
    const { hour, soilmoisture } = entry;
    if (hour in hourMap) {
      hourMap[hour].push(soilmoisture);
    } else {
      hourMap[hour] = [soilmoisture];
    }
  }

  for (const hour in hourMap) {
    const meanSoilMoisture = calculateMean(hourMap[hour]);
    const entry = {
      hour: parseInt(hour),
      soilmoisture: roundToTwoDecimalPlaces(meanSoilMoisture),
    };
    hourMap[hour] = entry;
  }

  const updatedData = [];
  for (const hour in hourMap) {
    updatedData.push(hourMap[hour]);
  }

  return updatedData;
}

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

var url_temp_hour_g, api_key_1_g;

var url_temp_day_g;

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
    url_temp_day_g = config.url_temp_day;
    const url_soilmoisture_day = config.url_soilmois_day;
    const url_temp_hour = config.url_temp_hour;
    url_temp_hour_g = config.url_temp_hour;
    api_key_1_g = config.api_key_1;
    const api_key_1 = config.api_key_1;
    const url_recommendation = config.url_recommendation;

    //console.log(url_temp_day);
    //console.log(api_key_1);

    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; //jauar ist 0 nicht 1
    const currentYear = currentDate.getFullYear();

    await fill_top_right_graph(url_temp_day, api_key_1,currentDayOfMonth,currentMonth,currentYear); //await fill_top_right_graph(url_temp_day, api_key_1,30,6,2023); // 

    await fill_top_left_graph(url_soilmoisture_day,api_key_1, currentDayOfMonth,currentMonth,currentYear); //    await fill_top_left_graph(url_soilmoisture_day,api_key_1, 2,7,2023);



    display_recommendation(url_recommendation, api_key_1);

  } catch (error) {
    console.error('Error:', error);
  }
}




async function fill_top_right_graph(url, apiKey, day, month, year) {
  
  const url_to_fetch = `${url}/${day}/${month}/${year}`;

  console.log("Fteching:", url_to_fetch);

  areaChartOptionsTemp = {
    series: [{
      name: 'Temperature',
      data: []
    }, {
      name: 'Humidity',
      data: []
    }],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#b01c1f", "#1f77b4"],
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
    yaxis: [
      {
        title: {
          text: 'Temperature'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Humidity'
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
    }
  };

  var areaChartTemp = new ApexCharts(document.querySelector("#chart-temp"), areaChartOptionsTemp);
  areaChartTemp.render();

  // GET Request
  try {
    const response = await fetch(url_to_fetch, {
      headers: {
        'Authorization': apiKey
      }
    });

    if (!response.ok) {
      throw new Error('Network Issue');
    }

    const data = await response.json();

    if (!Array.isArray(data.temperatureData)) {
      throw new Error('Not appropriate JSON Format');
    }

    const temperatureData = data.temperatureData;

    const updatedTemperatureData = calculateMeanValues(temperatureData);

    console.log("Updated:", updatedTemperatureData);


    areaChartOptionsTemp.series[0].data = updatedTemperatureData.map(entry => entry.temperature);
    areaChartOptionsTemp.series[1].data = updatedTemperatureData.map(entry => entry.humidity);
    areaChartOptionsTemp.xaxis.categories = updatedTemperatureData.map(entry => entry.hour);

    areaChartTemp.updateSeries([{ data: areaChartOptionsTemp.series[0].data }]);
    areaChartTemp.updateOptions(areaChartOptionsTemp);

    return data;
  } catch (error) {
    console.error('Error fteching data:', error);
  }
}


async function fill_top_left_graph(url, apiKey, day, month, year) {
  
  const url_to_fetch = `${url}/${day}/${month}/${year}`;

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
    colors: ["#256e30"],
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

      const soilMoisData = data.soilMoistureData;

      const updatedSoilMoisData = calculateMeanSoilMoisture(soilMoisData);

      console.log("Updated:", updatedSoilMoisData);


      areaChartOptionsSoilMoisture.series[0].data = updatedSoilMoisData.map(entry => entry.soilmoisture);
      areaChartOptionsSoilMoisture.xaxis.categories = updatedSoilMoisData.map(entry => entry.hour);

      areaChartSoilMoisture.updateOptions(areaChartOptionsSoilMoisture);
      return data;
    })
    .catch(error => {
      console.error('Error fteching data:', error);
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
      console.error('Error fteching data:', error);
    });

}

fetchData();
