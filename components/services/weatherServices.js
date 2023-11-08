import axios from "axios";

//const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={apiKey}";
//search by city
const getWeatherData = async (city) => {
  try {
    const weatherUrl = baseUrl
      .replace("{city}", city)
      .replace("{apiKey}", process.env.NEXT_PUBLIC_WEATHER_KEY);
    const response = await axios.get(weatherUrl);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch weather data");
    }
  } catch (error) {
    throw error;
  }
};
const weatherServices = {
  getWeatherData,
};

export default weatherServices;
