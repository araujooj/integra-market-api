import { Router } from 'express';

import privateProductsRouter from './privateProducts.routes';
import publicProductsRouter from './publicProducts.routes';
import orderRouter from './order.routes';
import userRouter from './user.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

// Private Stock - Only the supermarket can control this.
routes.use('/privateProducts', privateProductsRouter);

// Public Stock - Endpoint to B2C consumer
routes.use('/publicProducts', publicProductsRouter);

// Order receive from B2C API
routes.use('/order', orderRouter);

// CRUD Users (Market)
routes.use('/users', userRouter);

// Auth Service
routes.use('/sessions', sessionRouter);

export default routes;
