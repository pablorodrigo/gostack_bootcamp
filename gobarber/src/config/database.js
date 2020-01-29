module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  define: {
    timestamp: true,
    underscored: true,
    underscoreAll: true,
  },
};
