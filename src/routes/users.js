const auth = require("../middlewares/auth");
const routes = require("express").Router();
const controller = require("../controllers/users");

routes.get("/", controller.getUsers); // todos los usuarios
routes.get("/protected", auth.checkAuth, auth.checkRoleAuth(["admin"]), controller.getUsersTesting); // prueba
routes.get("/:id/admin", controller.getAdmin);
// routes.get("/:id/adopter", controller.getAdopter);

routes.post("/", controller.addUser); // agregar un usuario
routes.post("/adopters", controller.addAdopter); // agregar un usuario
routes.post("/auth/login", controller.authUser); // autenticar ingreso de usuario
// routes.post("/auth/register", controller.authUser); // autenticar registro de usuario

routes.get("/:nin", controller.getUser); // un usuario por cedula
routes.put("/:nin", controller.updateUser); // actualizar un usuario
routes.get("/:id/role", controller.getUserRole); // un usuario por cedula

module.exports = routes;
