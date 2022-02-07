"use strict";

const axios = require("axios");

class ProjectService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  async getUsers() {
    try {
      const response = await axios.get(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createUser(newUser) {
    try {
      const response = await axios.post(this.baseUrl + "/api/users", newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneUser(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/users/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }


  async deleteAllProjects() {
    try {
      const response = await axios.delete(this.baseUrl + "/api/projects");
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async createProject(newProject) {
    try {
      const response = await axios.post(this.baseUrl + "/api/projects", newProject);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getProject(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/projects/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async getProjects() {
    try {
      const response = await axios.get(this.baseUrl + "/api/projects");
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOneProject(id) {
    try {
      const response = await axios.delete(this.baseUrl + "/api/projects/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }



}

module.exports = ProjectService;