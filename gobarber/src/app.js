/**
 * application creation
 */

import express from 'express';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    // calling methods
    this.middlewares();
    this.routes();
  }

  // register of all middlewares in your project
  middlewares() {
    // handle to receiver form json data
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// project instance
export default new App().server;
