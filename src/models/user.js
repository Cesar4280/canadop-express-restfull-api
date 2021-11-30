const bcrypt = require("bcryptjs");
const { pool, queries } = require("../database");

const user = {

    async getAll() {
        return await pool.query(queries.getUsers);
    },

    async getOne(key, value) {
        const user = await pool.query(queries.getUser[key], value);
        return user.length > 0 ? user[0] : null;
    },

    async getRole(id) {
        const user = await pool.query(queries.getRole, id);
        return user.length > 0 ? user[0] : null;
    },

    async getTokenMessage(user) {
        const token = await pool.query(queries.getTokenMessage, user);
        console.log(token);
        return token.length > 0 ? token[0] : null;
    },

    async addOne(user) {
        const record = await this.getOne("username", user.USUARIO_NOMBRE);
        if (record !== null) return false;
        await pool.query(queries.addUser, user); 
        return true;
    },

    async addAdopter(user) {
        return await pool.query(queries.addAdopter, utils.dataToInsert(user));
    },

    async updateOne(key, value, data) {
        const record = await pool.query(queries.updateUser[key], [data, value]);
        return record.affectedRows > 0;
    },

    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },

    async checkPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    },

    checkColumnsToInsert(data) {
        return utils.checkToInsert.every(column => data.hasOwnProperty(column));
    }
};

const utils = {

    checkToInsert: [
        "USUARIO_CC",
        "USUARIO_NOMBRE",
        "USUARIO_CONTRASENA",
        "USUARIO_PNOMBRE",
        "USUARIO_SNOMBRE",
        "USUARIO_PAPELLIDO",
        "USUARIO_SAPELLIDO",
        "USUARIO_EDAD",
        "USUARIO_CORREO",
        "USUARIO_SEXO",
        "USUARIO_CELULAR",
        "USUARIO_DIRECCION",
        "ROL_USUARIO_ID",
        "ADOP_ECIVIL",
        "ADOP_NACAD",
        "ADOP_PROFESION",
        "ADOP_NHIJOS"
    ],

    dataToInsert(user) {
        const data = [];
        data.push(user.USUARIO_CC);
        data.push(user.USUARIO_NOMBRE);
        data.push(user.USUARIO_CONTRASENA);
        data.push(user.USUARIO_PNOMBRE);
        data.push(user.USUARIO_SNOMBRE);
        data.push(user.USUARIO_PAPELLIDO);
        data.push(user.USUARIO_SAPELLIDO);
        data.push(user.USUARIO_EDAD);
        data.push(user.USUARIO_CORREO);
        data.push(user.USUARIO_SEXO);
        data.push(user.USUARIO_CELULAR);
        data.push(user.USUARIO_DIRECCION);
        data.push(user.ROL_USUARIO_ID);
        data.push(user.ADOP_ECIVIL);
        data.push(user.ADOP_NACAD);
        data.push(user.ADOP_PROFESION);
        data.push(user.ADOP_NHIJOS);
        return data;
    }

};

module.exports = user;