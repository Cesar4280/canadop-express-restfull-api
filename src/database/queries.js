const queries = {};
const { filter, getOne, updateOne } = require("../helpers/queries");

/*****************************PERRO*******************************/

queries.getDogs = "SELECT * FROM perro";
queries.getFullDogs = "SELECT P.*, R.RAZA_NOMBRE FROM perro P JOIN raza R ON P.RAZA_ID=R.RAZA_ID";

queries.getDog = {
    id: getOne(queries.getFullDogs, "PRR_ID"),
    code: getOne(queries.getFullDogs, "PRR_COD")
};

queries.updateDog = {
    id: updateOne("perro", "PRR_ID"),
    code: updateOne("perro", "PRR_COD"),
};

queries.getAdoptionDogs = `${queries.getDogs} ${filter} AND PRR_DESPARASITADO=1`;
queries.getAvailableDogs = `${queries.getFullDogs} ${filter}`;

queries.addDog = "CALL sp_assign_code(?,?,?,?,?,?,?,?,?,?,?,?)";
queries.getAdopterToken = "CALL sp_get_owner_with_dog_code(?)";
queries.getDogByUser = "CALL sp_get_dog_with_user(?)";

/*****************************USUARIO*******************************/

queries.getUsers = "SELECT * FROM usuario";

queries.getUser = {
    id: getOne(queries.getUsers, "USUARIO_ID"),
    dni: getOne(queries.getUsers, "USUARIO_CC"),
    username: getOne(queries.getUsers, "USUARIO_NOMBRE")
};

queries.updateUser = {
    id: updateOne("usuario", "USUARIO_ID"),
    dni: updateOne("usuario", "USUARIO_CC"),
    username: updateOne("usuario", "USUARIO_NOMBRE"),
};

queries.addUser = "INSERT INTO usuario SET ?";

queries.authUser = `${queries.getUsers} WHERE USUARIO_NOMBRE=? AND USUARIO_CONTRASENA=? LIMIT 1`;


/*****************************ROL_USUARIO*******************************/

queries.getRoles = "SELECT * FROM rol_usuario";

queries.getRole = "SELECT ROL_USUARIO_NOMBRE FROM rol_usuario WHERE ROL_USUARIO_ID=(SELECT ROL_USUARIO_ID FROM usuario WHERE USUARIO_ID=? LIMIT 1) LIMIT 1";

queries.addRole = "INSERT INTO rol_usuario SET ?";
queries.updateRole = updateOne("rol_usuario", "ROL_USUARIO_ID");

/*********************************RAZA**********************************/

queries.getBreeds = "SELECT * FROM raza";

queries.getBreed = {
    id: getOne(queries.getBreeds, "RAZA_ID"),
    code: getOne(queries.getBreeds, "RAZA_COD"),
    name: getOne(queries.getBreeds, "RAZA_NOMBRE")
};

queries.updateBreed = {
    id: updateOne("raza", "RAZA_ID"),
    code: updateOne("raza", "RAZA_COD"),
    name: updateOne("raza", "RAZA_NOMBRE")
};

queries.addBreed = "INSERT INTO raza SET ?";

/************************************************************************/

queries.getAdmin = "SELECT * FROM administrador WHERE USUARIO_ID=?";

module.exports = queries;

/* module.exports = {
    getUsuario: "SELECT id_usuario FROM usuarios WHERE usuario = ? AND password = ? AND estado = 'A' LIMIT 1",
    getProducts: "SELECT * FROM Products",
    getProduct: "SELECT * FROM Products WHERE id = @id",
    addProduct: "INSERT INTO Products(name, description, quantity) VALUES(@name, @description, @quantity)",
    editProduct: "UPDATE Products SET name = @name, description = @description, quantity = @quantity WHERE id = @id",
    removeProduct: "DELETE FROM [webstore].[dbo].[Products] WHERE id = @id",
    countProducts: "SELECT COUNT(*) AS [count] FROM [webstore].[dbo].[Products]"
} */