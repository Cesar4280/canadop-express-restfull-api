module.exports = {
    url: String(process.env.API_URL),
    env: String(process.env.NODE_ENV),
    key: String(process.env.API_KEY),
    host: String(process.env.HOST),
    port: Number(process.env.PORT),
    secret: String(process.env.JWT_SECRET)
};