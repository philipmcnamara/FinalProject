'use strict';

const PS = {
  index: {
    handler: function (request, h) {
      return h.view('main', { title: 'Digital Lean' });
    },
  },
  signup: {
    handler: function (request, h) {
      return h.view('signup', { title: 'Sign up for Access' });
    },
  },
  login: {
    handler: function (request, h) {
      return h.view('login', { title: 'Login for Access' });
    },
  },
};

module.exports = PS;