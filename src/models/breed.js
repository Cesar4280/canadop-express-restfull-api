const { pool, queries } = require("../database");

const breed = {

    async getAll() {
        return await pool.query(queries.getBreeds);
    }

};

module.exports = breed;