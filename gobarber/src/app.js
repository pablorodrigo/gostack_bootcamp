/**
 * application creation
 */
import 'dotenv/config';

import express from 'express';
import path from 'path';
// it is a good exceptions' view for developer
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import routes from './routes';
import './database';
import sentryConfig from './config/sentry';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    // calling methods
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  // register of all middlewares in your project
  middlewares() {
    // sentry must be configured before routes
    this.server.use(Sentry.Handlers.requestHandler());
    // handle to receiver form json data
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // middleware for exception handler
    this.server.use(async (error, request, response, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(error, request).toJSON();

        return response.status(500).json(errors);
      }

      return response.status(500).json({ error: 'Internal server error' });
    });
  }
}

// project instance
export default new App().server;
