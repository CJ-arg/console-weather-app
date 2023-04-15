const fs = require("fs");
const axios = require("axios");
require("colors");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1));

      return palabras.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }
  async ciudad(place = " ") {
    //peticion http
    try {
      // Petición http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
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
