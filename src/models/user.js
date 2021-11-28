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

    async addOne(user) {
        const record = await this.getOne("username", user.USUARIO_NOMBRE);
        if (record !== null) return false;
        await pool.query(queries.addUser, user); 
        return true;
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
    }
};

module.exports = user;