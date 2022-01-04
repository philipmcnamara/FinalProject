'use strict';

const Accounts = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view('main', { title: 'Digital Lean' });
    }
  },
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view('signup', { title: 'Sign up for Access' });
    }
  },
  signup: {
    auth: false,
    handler: function(request, h) {
      const user = request.payload;
      this.users[user.email] = user;
      request.cookieAuth.set({ id: user.email });
      return h.redirect("/home");
    }
  },
  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view('login', { title: 'Login for Access' });
    }
  },
  login: {
    auth: false,
    handler: function (request, h) {
      const user = request.payload;
      if (user.email in this.users && user.password === this.users[user.email].password) {
        request.cookieAuth.set({ id: user.email });
        return h.redirect("/home");
      }
      return h.redirect("/");
    },
  },
  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  },
  showSettings: {
    handler: function(request, h) {
      var ownerEmail = request.auth.credentials.id;
      const userDetails = this.users[ownerEmail];
      return h.view('settings', { title: 'Project Settings', user: userDetails });
    }
  },
  updateSettings: {
    handler: function(request, h) {
      const user = request.payload;
      this.users[user.email] = user;
      return h.redirect('/settings');
    }
  },
};

module.exports = Accounts;