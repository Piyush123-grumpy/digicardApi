
import express from 'express'
const router = express.Router();
import * as digiController from '../controller/digiController.js'
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/imageMiddleware.js';


router.post('/createDigicard',[protect,upload.single('selectedFile')], digiController.createDigicard);
router.get('/digiCards/:id', digiController.getDigicard)
router.get('/digiCardsByUser/:userId',protect, digiController.getAllDigiCard);
router.put('/edit/:id',[protect,upload.single('selectedFile')], digiController.editDigicard);


export default router