module.exports = {
    HOST:   "localhost",
    USER: "postgres",
    PORT: "5432",
    PASSWORD: "1234",
    DB: "pruebanodepg",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};