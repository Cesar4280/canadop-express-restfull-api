const dogRoutes = require("./dogs");
const userRoutes = require("./users");
const breedRoutes = require("./breeds");

const routes = require("express").Router();

routes.use("/dogs", dogRoutes);
routes.use("/users", userRoutes);
routes.use("/breeds", breedRoutes);

module.exports = routes;