import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/authMiddleware';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// middleware to avoid user to through next routes
routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
