require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("colors");

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        //mostrar mensaje
        //buscar lugares
        // seleccionar lugares
        //clima
        //mostrarresultados
        const termino = await leerInput("Introduce una ubicacion:  ");
        // await busquedas.ciudad(lugar);
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        if (id === "0") continue;
        const lugarSeleccionado = lugares.find((lug) => lug.id === id);
        busquedas.agregarHistorial(lugarSeleccionado.nombre);
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        console.log({ id });
        console.log();
        console.log(lugarSeleccionado.nombre);
        console.log("info de la ciudad".green);
        console.log("ciudad".green, lugarSeleccionado.nombre);
        console.log("lat".green, lugarSeleccionado.lat);
        console.log("long".green, lugarSeleccionado.lng);
        console.log("temp".green);
        console.log("min".green);
        console.log("max".green);
        await pausa();
        break;

      case "2":
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;

      case "3":
        break;
    }
  } while (opt !== 0);
  await pausa();
  console.log("Hasta la vista.".bgRed);
};
main();
