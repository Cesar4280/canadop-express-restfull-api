module.exports = {
    host: String(process.env.MYSQL_HOST),
    user: String(process.env.MYSQL_USER),
    port: Number(process.env.MYSQL_PORT),
    database: String(process.env.MYSQL_DATABASE),
    password: String(process.env.MYSQL_PASSWORD)
};