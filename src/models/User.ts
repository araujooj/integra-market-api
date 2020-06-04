
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import PrivateProduct from './PrivateProduct';
import PublicProduct from './PublicProduct';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // orders: string;

  @OneToMany(() => PrivateProduct, privateProduct => privateProduct.market)
  privateProducts: PrivateProduct;

  @OneToMany(() => PublicProduct, publicProduct => publicProduct.market)
  publicProducts: PublicProduct;

  @Column()
  avatar: string;

  // apiKey: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
