import {request, response, Router} from 'express';
import authMiddleware from './app/middlewares/authMiddleware';
import UserSessionController from './app/controllers/UserSessionController';

const routes = new Router();

routes.post('/sessions', UserSessionController.store);

// middleware to avoid user to through next routes
routes.use(authMiddleware);

routes.get('/users', (request, response) => {
  return response.json({ return: 'ok' });
});

routes.post('/recipients',(request, response) =>{
  return response.json({ return: 'ok' });
});

export default routes;
