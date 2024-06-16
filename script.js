// Fetch temperature data from the JSON file
fetch('../assets/dataeksempel.json')
  .then(response => response.json())
  .then(data => {
    // Get unique station names from the data
    const stations = Array.from(new Set(data.map(item => item.Stationname)));

    // Populate the station dropdown menu
    const stationSelect = document.getElementById('StationSelect');
    stations.forEach(station => {
      const option = document.createElement('option');
      option.value = station;
      option.text = station;
      stationSelect.add(option);
    });

    function displayLatestTemperature(data, station) {
        const stationData = data.filter(item => item.Stationname === station)};

    // Display the latest temperature reading for the initially selected station
    displayLatestTemperature(data, stationSelect.value);
  
    // Wait for the dropdown to be populated before displaying the temperature
    stationSelect.addEventListener('change', () => {
        displayLatestTemperature(data, stationSelect.value);
    });

    // Function to display the latest temperature for the selected station
function displayLatestTemperature(data, station) {
    const stationData = data.filter(item => item.Stationname === station);
  
    // Convert datetime strings to Date objects for accurate sorting
    stationData.forEach(item => {
      const [datePart, timePart] = item.datetime.split(' ');
      const [dd, MM, yy] = datePart.split('.');
      const [hh, mm, ss] = timePart.split(':');
      item.dateObj = new Date(yy, mm - 1, dd, hh, mm, ss); // Note: month is zero-based
    });
  
    // Sort by Date objects in descending order (latest first)
    stationData.sort((a, b) => b.dateObj - a.dateObj); 
  
    const latestMeasurement = stationData[0];
  
    const temperatureDisplay = document.getElementById('temperatureDisplay');
    temperatureDisplay.innerHTML = `Latest Temperature: ${latestMeasurement.value} °C (${latestMeasurement.measurement}) at ${latestMeasurement.datetime}`;
}})  
  
  
