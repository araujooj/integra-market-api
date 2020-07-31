import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Market from './Market';
import Product from './Products';

@Entity('market_products')
class MarketProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Market)
  @JoinColumn({ name: 'market_id' })
  market: Market;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @Column()
  market_id: string;

  @Column()
  price: number;

  @Column()
  promotion: boolean;

  @Column()
  secret: boolean;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MarketProducts;
