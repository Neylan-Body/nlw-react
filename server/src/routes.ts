import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer'; 

import OrphanagesController from './controllers/OrphanagesController';
import UserController from './controllers/UserController';
import User from './models/User';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', ()=>console.log("entrei"));
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.get('/login', UserController.login);
routes.post('/save-user', UserController.create);
routes.post('/login-user', UserController.show);
routes.post('/orphanages', OrphanagesController.create);

export default routes;