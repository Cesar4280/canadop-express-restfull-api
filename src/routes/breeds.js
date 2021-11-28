const routes = require("express").Router();
const controller = require("../controllers/breeds");

routes.get("/", controller.getBreeds);   // todos las raza
// routes.get("/:id", controller.getBreed); info de una raza
// routes.post("/", controller.addBreed);   agregar una raza
// routes.put("/", controller.addBreed);    actualizar una raza

module.exports = routes;