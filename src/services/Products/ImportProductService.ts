import csvParse from 'csv-parse';
import fs from 'fs';
import { getRepository } from 'typeorm';
import MarketProducts from '../../models/MarketProducts';
import Product from '../../models/Products';

interface Request {
  filePath: string;
}

interface ProductCSV {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportProductsService {
  async execute({ filePath }: Request): Promise<Product[] | MarketProducts[]> {
    const parsers = csvParse({ delimiter: ', ', from_line: 2 });

    const csvReadStream = fs.createReadStream(filePath);

    const parseCSV = csvReadStream.pipe(parsers);

    const productRepository = getRepository(MarketProducts);

    const products: ProductCSV[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value) return;

      categories.push(category);

      products.push({ title, type, value, category });
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    const createdProducts = productRepository.create(
      products.map(product => ({
        title: product.title,
        type: product.type,
        value: product.value,
        category: product.category,
      })),
    );

    await productsRepository.save(createdProducts);

    await fs.promises.unlink(filePath);

    return createdProducts;
  }
}

export default ImportProductsService;
