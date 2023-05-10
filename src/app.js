const express = require('express');
const { loginRoute, userRoute } = require('./routes');

// const app = express();

// // não remova ou mova esse endpoint
// app.get('/', (_request, response) => {
//   response.send();
// });

// app.use(express.json());
// app.use('/login', loginRoute);
// app.use('/user', userRoute);

// // É importante exportar a constante `app`,
// // para que possa ser utilizada pelo arquivo `src/server.js`
// module.exports = app;

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
  }
}

module.exports = new App().app;
