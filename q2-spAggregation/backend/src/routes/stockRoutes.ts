import express from 'express';
import { getStockAverage, getStockCorrelation } from '../controllers/stockController';


const router = express.Router();

router.get('/stocks/', getStockAverage);
router.get('/stockcorrelation', getStockCorrelation);

export default router;

