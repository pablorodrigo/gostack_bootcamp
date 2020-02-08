import { Router } from 'express';
import authMiddleware from './app/middlewares/authMiddleware';
import UserSessionController from './app/controllers/UserSessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/sessions', UserSessionController.store);

// middleware to avoid user to through next routes
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/users', RecipientController.update);

export default routes;
