module.exports = {
    HOST:   "172.17.0.2",
    USER: "postgres",
    PORT: "5432",
    PASSWORD: "postgres",
    DB: "pruebanodepg",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};