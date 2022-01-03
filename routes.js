const PS = require('./app/controllers/ProblemSolver');

module.exports = [
  { method: 'GET', path: '/', config: PS.index },
  { method: "GET", path: "/signup", config: PS.signup },
  { method: "GET", path: "/login", config: PS.login },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public',
      },
    },
  },
];