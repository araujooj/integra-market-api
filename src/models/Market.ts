import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import MarketProducts from './MarketProducts';

@Entity('market')
class Market {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @OneToMany(() => MarketProducts, marketProducts => marketProducts.market, {
    cascade: true,
  })
  market_products: MarketProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Market;
