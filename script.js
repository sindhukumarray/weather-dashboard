const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const output = document.getElementById('output');

// ham aha  API Key lgaye 
const API_KEY = 'YOUR_API_KEY';

// aha pe  submit ke liye hai
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // to prevent page reload

  const city = cityInput.value.trim();

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

    // to Display result
    output.innerHTML = `
      <h2>${name}, ${country}</h2>
      <p> Temperature: ${temp} °C</p>
      <p> Condition: ${weather[0].main}</p>
      <p> Humidity: ${humidity}%</p>
      <p> Wind: ${wind.speed} m/s</p>
    `;

  } catch (error) {
    output.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
});