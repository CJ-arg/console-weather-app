const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea Hacer?",
    choices: [
      {
        value: 1,
        name: "1* Buscar Ciudad",
      },
      {
        value: 2,
        name: "2* Historial",
      },

      {
        value: 0,
        name: "0* Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("================================================".bgBlue);
  console.log("================================================".green);
  console.log("---------SELECCIONE UNA OPCION------------------".red);
  console.log("================================================".blue);
  console.log("================================================\n".bgGreen);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  // console.log("\n");
  console.log("\n");
  const { enter } = await inquirer.prompt(question);
  return enter;
};
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,

      validate(value) {
        if (value.length === 0) {
          return "Ingrese un valor para continuar";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};
const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1})*`.green;
    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + "Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione un lugar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};
const confirmar = async (message) => {
  const confirma = [
    {
      type: "confirm",
      name: "OK",
      message,
    },
  ];
  const { OK } = await inquirer.prompt(confirma);
  return OK;
};
const mostrarListadoCheck = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1})*`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completed ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
  confirmar,
  mostrarListadoCheck,
};
