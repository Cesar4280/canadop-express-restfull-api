const { pool, queries } = require("../database");

const dog = {

    async getAll() {
        return await pool.query(queries.getDogs);
    },

    async getAdoptions() {
        return await pool.query(queries.getAdoptionDogs);
    },

    async getAvailables() {
        return await pool.query(queries.getAvailableDogs);
    },

    async getOne(key, value) {
        const dog = await pool.query(queries.getDog[key], value);
        return dog.length > 0 ? dog[0] : null;
    },

    async getAdopterToken(code) {
        const token = await pool.query(queries.getAdopterToken, code);
        return token[0].length > 0 ? token[0][0] : null;
    },

    async addOne(dog) {
        return await pool.query(queries.addDog, utils.dataToInsert(dog));
    },

    async updateOne(key, value, data) {
        const record = await pool.query(queries.updateDog[key], [utils.dataToUpdate(data), value]);
        return record.affectedRows > 0;
    },

    checkColumnsToUpdate(data) {
        return utils.checkToUpdate.every(column => data.hasOwnProperty(column));
    },

    checkColumnsToInsert(data) {
        return utils.checkToInsert.every(column => data.hasOwnProperty(column));
    }

};

const utils = {

    checkToUpdate: [
        "PRR_SALUD",
        "PRR_COLOR",
        "PRR_ALTURA",
        "PRR_TAMANO",
        "PRR_LONGEVIDAD",
        "PRR_ESTERILIZADO",
        "PRR_DESPARASITADO"
    ],

    checkToInsert: [
        "PRR_NOMBRE",
        "PRR_SEXO",
        "PRR_TAMANO",
        "PRR_LONGEVIDAD",
        "PRR_ALTURA",
        "PRR_COLOR",
        "PRR_FOTO",
        "PRR_DESPARASITADO",
        "PRR_ESTERILIZADO",
        "PRR_SALUD",
        "ADMIN_ID",
        "RAZA_ID"
    ],

    dataToInsert(dog) {
        const data = [];
        data.push(dog.PRR_NOMBRE);
        data.push(dog.PRR_SEXO);
        data.push(dog.PRR_TAMANO);
        data.push(dog.PRR_LONGEVIDAD);
        data.push(dog.PRR_ALTURA);
        data.push(dog.PRR_COLOR);
        data.push(dog.PRR_FOTO);
        data.push(dog.PRR_DESPARASITADO);
        data.push(dog.PRR_ESTERILIZADO);
        data.push(dog.PRR_SALUD);
        data.push(dog.ADMIN_ID);
        data.push(dog.RAZA_ID);
        return data;
    },

    dataToUpdate(dog) {
        const data = {};
        data.PRR_SALUD = dog.PRR_SALUD;
        data.PRR_COLOR = dog.PRR_COLOR;
        data.PRR_ALTURA = dog.PRR_ALTURA;
        data.PRR_TAMANO = dog.PRR_TAMANO;
        data.PRR_LONGEVIDAD = dog.PRR_LONGEVIDAD;
        data.PRR_ESTERILIZADO = dog.PRR_ESTERILIZADO;
        data.PRR_DESPARASITADO = dog.PRR_DESPARASITADO;
        return data;
    }

};

module.exports = dog;