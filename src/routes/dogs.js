const routes = require("express").Router();
const controller = require("../controllers/dogs");

routes.get("/", controller.getDogs); // todos los perros
routes.get("/adoption", controller.getAdoptionDogs); // perros en condición de adopción
routes.get("/available", controller.getAvailableDogs); // perros disponibles en fundación
routes.get("/:code", controller.getDog); // un perro por codigo
routes.put("/:code", controller.updateDog); // actualizar un perro
routes.post("/", controller.addDog); // agregar un perro
routes.post("/user/:user", controller.getDogByUser); // agregar un perro
routes.get("/:code/adopter/token", controller.getAdopterToken); // agregar un perro

module.exports = routes;