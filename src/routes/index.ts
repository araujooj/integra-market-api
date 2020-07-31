import { Router } from 'express';

import productRouter from './product.routes';
import marketRouter from './market.routes';
import sessionRouter from './sessions.routes';
const routes = Router();

// Stock - Endpoint to B2C consumer
routes.use('/products', productRouter);

// CRUD (Market)
routes.use('/market', marketRouter);

// Auth Service
routes.use('/sessions', sessionRouter);

export default routes;
