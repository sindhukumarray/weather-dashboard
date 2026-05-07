const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const output = document.getElementById('output');

//to show History list
const historyList = document.getElementById('history-list');

//to apply Dark mode button
const themeToggle = document.getElementById('theme-toggle');

// Toggle dark mode
themeToggle.addEventListener('click', () => {

  document.body.classList.toggle('dark-mode');

  if(document.body.classList.contains('dark-mode')){
    themeToggle.textContent = '☀';
  } else {
    themeToggle.textContent = '🌙';
  }

});

//to use in  API Key
const API_KEY = '3d65117baa7b37d8c8ab6e82b36b4e3e';

//to  saved history
let searchHistory =
  JSON.parse(localStorage.getItem('weatherHistory')) || [];

//to  Show search history
function renderHistory() {

  historyList.innerHTML = '';

  searchHistory.forEach((city) => {

    const li = document.createElement('li');

    li.textContent = city;

    historyList.appendChild(li);

  });

}

// a hai hmara  MAIN WEATHER FUNCTION
async function getWeather(city) {

  // to Loading state
  output.innerHTML = '<p>Loading...</p>';

  try {

    //to  Fetch API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    // to Error handling
    if (!response.ok) {
      throw new Error('City not found');
    }

    // Convert to JSON
    const data = await response.json();

    const {
      name,
      sys: { country },
      main: { temp, humidity },
      weather,
      wind
    } = data;

    // to show Weather icon
    const icon = weather[0].icon;

    // Show weather
    output.innerHTML = `
      <h2>${name}, ${country}</h2>

      <img 
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="Weather Icon"
      >

      <p>🌡 Temperature: ${temp} °C</p>
      <p>☁ Condition: ${weather[0].main}</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬 Wind: ${wind.speed} m/s</p>
    `;

  } catch (error) {

    output.innerHTML = `
      <p style="color:red;">
        ${error.message}
      </p>
    `;
  }

}

//click Form submit
form.addEventListener('submit', (e) => {

  e.preventDefault();

  const city = cityInput.value.trim();

  //to city place Validation
  if (!city) {
    output.textContent = 'Please enter a city name';
    return;
  }

  // to Save last searched city
  localStorage.setItem('lastCity', city);

  // to Save history
  if (!searchHistory.includes(city)) {

    searchHistory.push(city);

    localStorage.setItem(
      'weatherHistory',
      JSON.stringify(searchHistory)
    );

  }

  //to  Update history UI
  renderHistory();

  //to  Fetch weather
  getWeather(city);

});

// to Show history on refresh
renderHistory();

//  Load last searched city automatically
const lastCity = localStorage.getItem('lastCity');

if (lastCity) {

  getWeather(lastCity);

}