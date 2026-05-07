const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const output = document.getElementById('output');

// to show history list
const historyList = document.getElementById('history-list');
// to Dark mode button
const themeToggle = document.getElementById('theme-toggle');

//to Toggle dark mode
themeToggle.addEventListener('click', () => {

  //to  Add and remove dark mode class
  document.body.classList.toggle('dark-mode');

  // to change text
  if(document.body.classList.contains('dark-mode')){
    themeToggle.textContent = '☀ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }

});
// ham aha  API Key  lgayege
const API_KEY = '3d65117baa7b37d8c8ab6e82b36b4e3e';

// to saved history  localStorage
let searchHistory =
  JSON.parse(localStorage.getItem('weatherHistory')) || [];

  // to Function to display search history
function renderHistory() {

  // a sare  old history ko clear krega
  historyList.innerHTML = '';

  // to history array
  searchHistory.forEach((city) => {

    // Create list item
    const li = document.createElement('li');

    li.textContent = city;

    // to Add into list
    historyList.appendChild(li);

  });

}

// aha pe  submit ke liye hai
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // to prevent page reload

  const city = cityInput.value.trim();

  // to find duplicate cities
if (!searchHistory.includes(city)) {

  // Add city into array
  searchHistory.push(city);

  // Save into localStorage
  localStorage.setItem(
    'weatherHistory',
    JSON.stringify(searchHistory)
  );

}

  // to input corret data Validation
  if (!city) {
    output.textContent = ' Please enter a city name';
    return;
  }

  // Show  state to loading
  output.innerHTML = '<p> Loading...</p>';

  try {
    //to Fetch data from API i
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    //to Check error msg
    if (!response.ok) {
      throw new Error('City not found ');
    }

    //to Convert response to JSON
    const data = await response.json();

    const {
      name,
      sys: { country },
      main: { temp, humidity },
      weather,
      wind
    } = data;

// to Update history on screen
renderHistory();
    //to show in weather icon
     const icon = weather[0].icon;
    // to Display result
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
    output.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});

