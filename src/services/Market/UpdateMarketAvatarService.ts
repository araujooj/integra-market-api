import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../../config/upload';
import Market from '../../models/Market';
import AppError from '../../errors/AppError';
import MarketRepository from '../../repositories/marketRepository';

interface Request {
  market_id: string;
  avatarFilename: string;
}

export default class UpdateMarketAvatarService {
  public async execute({
    market_id,
    avatarFilename,
  }: Request): Promise<Market> {
    const marketRepository = getCustomRepository(MarketRepository);

    const market = await marketRepository.findOne(market_id);

    if (!market) {
      throw new AppError('Only authenticated markets can change avatar', 401);
    }

    if (market.avatar) {
      const marketAvatarFilePath = path.join(
        uploadConfig.directory,
        market.avatar,
      );

      const marketAvatarFileExists = await fs.promises.stat(
        marketAvatarFilePath,
      );

      if (marketAvatarFileExists) {
        await fs.promises.unlink(marketAvatarFilePath);
      }
    }

    market.avatar = avatarFilename;

    await marketRepository.save(market);

    return market;
  }
}
