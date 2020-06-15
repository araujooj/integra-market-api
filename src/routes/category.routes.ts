import { Router } from 'express';
import { getRepository } from 'typeorm';
import Category from '../models/Category';

const categoryRouter = Router();

categoryRouter.get('/', async (request, response) => {
  const categoryRepository = getRepository(Category);

  const category = await categoryRepository.find();

  return response.json(category);
});

export default categoryRouter;
