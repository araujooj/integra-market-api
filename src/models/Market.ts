import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Product from './Products';
import Category from './Category';

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

  // orders: string;

  @OneToMany(() => Product, product => product.market)
  products: Product;

  @OneToMany(() => Category, category => category.market)
  categories: Category;

  @Column()
  avatar: string;

  @Column()
  uf: string;

  // apiKey: string;

  @Column()
  city: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Market;
