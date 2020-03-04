import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/authMiddleware';

// configs
import multerConfig from './config/multer';

// controllers
import UserSessionController from './app/controllers/UserSessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManDeliveriesController from './app/controllers/DeliveryManDeliveriesController';
import DeliveryManDeliveriesEndController from './app/controllers/DeliveryManDeliveriesEndController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', UserSessionController.store);

// delivery status
routes.get(
  '/deliveryman_deliveries/:id',
  DeliveryManDeliveriesController.index
);
routes.get(
  '/deliveryman/:id/deliveries',
  DeliveryManDeliveriesController.index
);
routes.put(
  '/deliveryman_deliveries/:id',
  DeliveryManDeliveriesController.update
);
routes.put(
  '/deliveryman_deliveries_end/:id',
  DeliveryManDeliveriesEndController.update
);

// delivery problems
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

// middleware to avoid user to through next routes
routes.use(authMiddleware);

// recipients
routes.post('/recipients', RecipientController.store);
// users
routes.put('/users', RecipientController.update);
// files
routes.post('/files', upload.single('file'), FileController.store);
// deliverymen
routes.get('/deliverymen', DeliveryManController.index);
routes.post('/deliverymen', DeliveryManController.store);
routes.put('/deliverymen/:id', DeliveryManController.update);
routes.delete('/deliverymen/:id', DeliveryManController.delete);
// deliveries
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
