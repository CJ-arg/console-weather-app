const axios = require("axios");
require("colors");
class Busquedas {
  historial = ["Lima", "Quito"];
  constructor() {
    //leer DB
  }
  async ciudad(place = " ") {
    //peticion http
    try {
      const resp = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=ip&language=es&access_token=pk.eyJ1IjoicGVkcnBncmVlbmRlciIsImEiOiJjbGZ6ZXNnZ2Ywa2wyM2htc283dDRmOHE1In0.F7VOKPYUuCwmDxfnjDs33A`
      );
      //Peticion HTTP

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      })); //ciudades que coincidan
    } catch (error) {
      return [];
    }
  }
  async climaLugar(lat, lng) {
    try {
      const resp = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${OPENWEATHER_KEY}&units=metric&lang=es`
      );
      console.log(resp.data.weather);
      return resp.data.weather.main.map((clima) => ({
        id: clima.id,
        description: clima.description,
        min: clima.min,
        max: clima.max,
        temp: clima.temp,
      }));
    } catch (error) {
      return;
    }
  }
  agregarHistorial(lugar = "") {
    this.historial.unshift(lugar);
  }
}
module.exports = Busquedas;

// https://www.mapbox.com/

// https://docs.mapbox.com/api/search/geocoding/
