function wrangleLocationResponse(LocationRepsonse) {

  const locationItem = LocationRepsonse[0];

  return {
    formatted_query: locationItem.display_name,
    latitude: locationItem.lat,
    longitude: locationItem.lon
  };   

}

module.exports = {
  wrangleLocationResponse

};