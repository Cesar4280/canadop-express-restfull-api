const { dogModel } = require("../models");
const { response } = require("../helpers");

exports.getDog = async (req, res) => {
    try {
        const dog = await dogModel.getOne("code", req.params.code);
        if (dog === null) return response.notFound(res, "Perro no encontrado");
        response.success(res, "Perro encontrado", dog);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getDogs = async (req, res) => {
    try {
        const dogs = await dogModel.getAll();
        response.success(res, "Listado de perros", dogs);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getAdoptionDogs = async (req, res) => {
    try {
        const dogs = await dogModel.getAdoptions();
        response.success(res, "Listado de perros en adopcion", dogs);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getAvailableDogs = async (req, res) => {
    try {
        const dogs = await dogModel.getAvailables();
        response.success(res, "Listado de perros en fundación", dogs);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getDogByUser = async (req, res) => {
    try {
        const dog = await dogModel.getDogByUser(req.params.user.slice(0, 45));
        if (dog === null) return response.notFound(res, "Usuario sin mascota");
        response.success(res, "Mascota encontrada", dog);
    } catch (error) {
        response.internalError(res);
    }
};

exports.getAdopterToken = async (req, res) => {
    try {
        const token = await dogModel.getAdopterToken(req.params.code.slice(0, 10));
        if (token === null) return response.notFound(res, "Token no encontrado");
        response.success(res, "Token del adoptante", token);
    } catch (error) {
        response.internalError(res);
    }
};

exports.addDog = async (req, res) => {
    try {
        const valid = dogModel.checkColumnsToInsert(req.body);
        if (!valid) return response.badRequest(res, "Faltan ciertas propiedades");
        await dogModel.addOne(req.body);
        response.created(res, "Perro agregado al sistema");
    } catch (error) {
        response.internalError(res);
    }
};

exports.updateDog = async (req, res) => {
    try {
        const valid = dogModel.checkColumnsToUpdate(req.body);
        if (!valid) return response.badRequest(res, "Faltan ciertas propiedades");
        const dog = await dogModel.getOne("code", req.params.code);
        if (dog === null) return response.notFound(res, "Perro no encontrado");
        const record = await dogModel.updateOne("code", req.params.code, req.body);
        if (!record) return response.internalError(res);
        response.success(res, "Los datos del perro han sido actualizados");
    } catch (error) {
        response.internalError(res);
    }
};