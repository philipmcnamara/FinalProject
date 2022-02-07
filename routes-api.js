const Users = require("./app/api/users");
const projects = require("./app/api/projects");


module.exports = [
  { method: "GET", path: "/api/users", config: Users.find },
  { method: "GET", path: "/api/users/{id}", config: Users.findOne },
  { method: "POST", path: "/api/users", config: Users.create },
  { method: "DELETE", path: "/api/users/{id}", config: Users.deleteOne },
  { method: "DELETE", path: "/api/users", config: Users.deleteAll },

  { method: "GET", path: "/api/projects", config: projects.find },
  { method: "GET", path: "/api/projects/{id}", config: projects.findOne },
  { method: "POST", path: "/api/projects", config: projects.create },
  { method: "DELETE", path: "/api/projects/{id}", config: projects.deleteOne },
  { method: "DELETE", path: "/api/projects", config: projects.deleteAll },

];