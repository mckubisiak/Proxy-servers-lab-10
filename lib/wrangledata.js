function wrangleLocationResponse(LocationRepsonse) {

  const locationItem = LocationRepsonse[0];

  return {
    formatted_query: locationItem.display_name,
    latitude: locationItem.lat,
    longitude: locationItem.lon
  };   

}

function wrangleWeatherResponse(weatherRepsonse) {

  const weatherItem = weatherRepsonse.data;

  const wrangledWeather = weatherItem.map(forecast => {
    return {
      forecast: forecast.weather.description,
      time: `${new Date(forecast.ts * 1000)}`
    };
  }); 
  return wrangledWeather;
}

module.exports = {
  wrangleLocationResponse,
  wrangleWeatherResponse
};