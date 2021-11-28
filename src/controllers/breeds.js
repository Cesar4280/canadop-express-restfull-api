const { response } = require("../helpers");
const { breedModel } = require("../models");

exports.getBreeds = async (req, res) => {
    try {
        const breeds = await breedModel.getAll();
        response.success(res, "Listado de razas", breeds);
    } catch (error) {
        response.internalError(res);
    }
};