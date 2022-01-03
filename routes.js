const PS = require('./app/controllers/ProblemSolver');

module.exports = [
  { method: 'GET', path: '/', config: PS.index },
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