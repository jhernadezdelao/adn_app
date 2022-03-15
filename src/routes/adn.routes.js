import {Router} from 'express';
import * as adnController from '../controllers/adn.controller'
import { authJwt } from "../middlewares";

const router = Router();

router.post('/mutation',authJwt.verifyToken,adnController.checkAdn)
router.get('/getAdn',[authJwt.verifyToken, authJwt.isAdmin],adnController.getAdn)

export default router;