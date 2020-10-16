import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import FacilitiesController from '../controllers/FacilitiesController';

const routes = Router();
const upload = multer(uploadConfig);
routes.get('/facilities', FacilitiesController.index);
routes.get('/facilities/:id', FacilitiesController.show);
routes.post('/facilities', upload.array('images'), FacilitiesController.create);

export default routes;
