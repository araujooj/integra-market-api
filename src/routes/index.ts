import { Router } from 'express';

import productRouter from './product.routes';
import orderRouter from './order.routes';
import marketRouter from './market.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

// Stock - Endpoint to B2C consumer
routes.use('/products', productRouter);

// Order receive from B2C API
routes.use('/order', orderRouter);

// CRUD (Market)
routes.use('/market', marketRouter);

// Auth Service
routes.use('/sessions', sessionRouter);

export default routes;
