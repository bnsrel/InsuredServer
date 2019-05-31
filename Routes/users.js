const express = require('express');
const userController = require('../Controllers/usersController.js');

const usersRoute = function() {
  const route = express.Router();

  route.post('/registerUser', userController.addUser);

  route.delete('/removeUser', (req, res) => {});

  route.get('/getAllUsers', userController.getAllUsers);

  route.post('/login', userController.login);

  return route;
};

module.exports = usersRoute();
