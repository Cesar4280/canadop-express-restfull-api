const { jwt, response } = require("../helpers");
const { userModel, adminModel } = require("../models");

exports.getUsersTesting = async (req, res) => {
    try {
        const user = await jwt.verifyToken(req.tokenSession);
        if (user !== null) return response.success(res, "Usuario autenticado", user);
        response.unauthorized(res, "Token invalido o caducado");
    } catch (error) {
        response.internalError(res);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getAll();
        response.success(res, "Listado de usuarios", users);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userModel.getOne("dni", req.params.nin);
        if (user === null) return response.notFound(res, "Usuario no encontrado");
        response.success(res, "Usuario encontrado", user);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const admin = await adminModel.getOne(req.params.id);
        if (admin === null) return response.notFound(res, "Administrador no encontrado");
        response.success(res, "Administrador encontrado", admin);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getUserRole = async (req, res) => {
    try {
        const role = await userModel.getRole(req.params.id);
        if (role === null) return response.notFound(res, "Rol no encontrado");
        response.success(res, "Rol encontrado", role);
    } catch (error) {
        response.internalError(res);
    }
};

exports.authUser = async (req, res) => {
    try {
        let message = "Usuario o contraseña incorrecta";
        const user = await userModel.getOne("username", req.body.USUARIO_NOMBRE);
        if (user === null) return response.notFound(res, message);
        const checkPassword = await userModel.checkPassword(req.body.USUARIO_CONTRASENA, user.USUARIO_CONTRASENA);
        if (!checkPassword) return response.notFound(res, message);
        const role = await userModel.getRole(user.USUARIO_ID);
        user.TOKEN_SESSION = await jwt.tokenSign({ id: user.USUARIO_ID, role: role.ROL_USUARIO_NOMBRE });
        message = "Sesión creada satisfactoriamente";
        response.created(res, message, user);
    } catch (error) {
        response.internalError(res);
    }
};

exports.addUser = async (req, res) => {
    try {
        const record = await userModel.addOne(req.body);
        if (!record) return response.conflict(res, "Ya existe un usuario con esa cedula");
        response.created(res, "Usuario agregado al sistema", req.body);
    } catch (error) {
        response.internalError(res);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const record = await userModel.updateOne("id", req.params.nin, req.body);
        if (!record) return response.notFound(res, "Usuario no encontrado");
        response.success(res, "Los datos del usuario han sido actualizados");
    } catch (error) {
        response.internalError(res);
    }
};