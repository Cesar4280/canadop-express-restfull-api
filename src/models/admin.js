const { pool, queries } = require("../database");

const admin = {

    async getOne(userId) {
        const admin = await pool.query(queries.getAdmin, userId);
        return admin.length > 0 ? admin[0] : null;
    }

};

module.exports = admin;