/**
 * application creation
 */

import express from 'express';
import path from 'path';
import routes from './routes';
import './database';

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
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

// project instance
export default new App().server;
