import express from 'express';
import { auth } from '../middleware/auth';
import CatCtrl from '../controllers/cat.controller';

const router = express.Router();
const catCtrl = new CatCtrl();

router.route('')
    .get(catCtrl.getAll)
    .post(auth, catCtrl.addCat);

router.route('/:id')
    .get(catCtrl.getCat)
    .put(auth, catCtrl.updateCat)
    .delete(auth, catCtrl.deleteCat);

export default router;
