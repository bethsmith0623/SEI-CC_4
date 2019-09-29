export function getCurWeatherByLatLng(lat, lng) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=d3945aa316355ce92bb8cc10bf63e3da`;
  return fetch(endpoint, {mode: 'cors'}).then(res => res.json());
}