import { Router } from 'express';
import authMiddleware from './app/middlewares/authMiddleware';

const routes = new Router();

// middleware to avoid user to through next routes
routes.use(authMiddleware);

routes.get('/users', (request, response) => {
  return response.json({ return: 'ok' });
});

export default routes;
