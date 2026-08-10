export const getWeatherForecast = async (lat, lng, startDate, endDate) => {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}` +
      `&longitude=${lng}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,` +
      `relative_humidity_2m_mean,wind_speed_10m_max` +
      `&timezone=auto` +
      `&start_date=${startDate}` +
      `&end_date=${endDate}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.daily) {
      return [];
    }

    return data.daily.time.map((date, index) => ({
      date,

      maxTemp: data.daily.temperature_2m_max[index],

      minTemp: data.daily.temperature_2m_min[index],

      humidity: data.daily.relative_humidity_2m_mean[index],

      wind: data.daily.wind_speed_10m_max[index],

      weatherCode: data.daily.weather_code[index],
    }));
  } catch (error) {
    console.error("Weather Service Error:", error.message);

    return [];
  }
};

export const getWeatherInfo = (code) => {
  switch (code) {
    case 0:
      return {
        icon: "☀️",
        condition: "Sunny",
      };

    case 1:
      return {
        icon: "🌤️",
        condition: "Mainly Clear",
      };

    case 2:
      return {
        icon: "⛅",
        condition: "Partly Cloudy",
      };

    case 3:
      return {
        icon: "☁️",
        condition: "Cloudy",
      };

    case 45:
    case 48:
      return {
        icon: "🌫️",
        condition: "Foggy",
      };

    case 51:
    case 53:
    case 55:
      return {
        icon: "🌦️",
        condition: "Drizzle",
      };

    case 61:
    case 63:
      return {
        icon: "🌧️",
        condition: "Rain",
      };

    case 65:
      return {
        icon: "🌧️",
        condition: "Heavy Rain",
      };

    case 71:
    case 73:
    case 75:
      return {
        icon: "🌨️",
        condition: "Snow",
      };

    case 80:
    case 81:
    case 82:
      return {
        icon: "🌦️",
        condition: "Rain Showers",
      };

    case 95:
    case 96:
    case 99:
      return {
        icon: "⛈️",
        condition: "Thunderstorm",
      };

    default:
      return {
        icon: "🌤️",
        condition: "Unknown",
      };
  }
};

export const getFormattedWeather = async (lat, lng, startDate, endDate) => {
  const forecast = await getWeatherForecast(lat, lng, startDate, endDate);

  return forecast.map((item) => {
    const weatherInfo = getWeatherInfo(item.weatherCode);

    const date = new Date(item.date);

    return {
      date: item.date,

      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      formattedDate: date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }),

      icon: weatherInfo.icon,

      condition: weatherInfo.condition,

      maxTemp: item.maxTemp,

      minTemp: item.minTemp,

      humidity: item.humidity,

      wind: item.wind,
    };
  });
};