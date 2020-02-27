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

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', UserSessionController.store);

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

export default routes;
