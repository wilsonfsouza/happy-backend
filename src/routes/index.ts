import { Router } from 'express';
import FacilitiesController from '../controllers/FacilitiesController';

const routes = Router();

routes.post('/facilities', FacilitiesController.create);

export default routes;
