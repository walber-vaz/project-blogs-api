const express = require('express');
const { loginRoute, userRoute, categoriesRoute } = require('./routes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.get('/', (_request, response) => {
      response.send();
    });
    this.app.use('/login', loginRoute);
    this.app.use('/user', userRoute);
    this.app.use('/categories', categoriesRoute);
  }
}

module.exports = new App().app;
