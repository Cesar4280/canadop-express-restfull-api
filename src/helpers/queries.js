exports.filter = "WHERE PRR_ADOPTADO IS NULL";
exports.getOne = (query, column) => `${query} WHERE ${column}=? LIMIT 1`;
exports.updateOne = (table, column) => `UPDATE ${table} SET ? WHERE ${column}=?`;