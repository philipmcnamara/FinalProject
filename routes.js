"use strict";

const Accounts = require("./app/controllers/accounts");
const Projects = require("./app/controllers/projects");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: "GET", path: "/home", config: Projects.home },
  { method: "POST", path: "/project", config: Projects.project },
  { method: "GET", path: "/report", config: Projects.report },

  { method: "GET", path: "/addProject", config: Accounts.showProject },
  { method: 'POST', path: '/addProject', config: Accounts.Project },

  { method: 'POST', path:"/displayProject", config: Projects.Project },
  { method: 'POST', path:"/displayUpdatedProject", config: Projects.UpdateProject },
  { method: "POST", path: "/displayDeletedProject", config: Projects.deleteProject},


  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public"
      }
    },
    options: { auth: false }
  }
];
