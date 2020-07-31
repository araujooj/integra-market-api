import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import MarketProducts from './MarketProducts';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  gtin: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @OneToMany(() => MarketProducts, marketProducts => marketProducts.product)
  market_products: MarketProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
