import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import User from "./User";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    category: string;

    @Column()
    secret: boolean;

    @ManyToOne(() => User, user => user.products, { eager: true })
    @JoinColumn({ name: 'market_id' })
    market: User;

    @Column()
    promotion: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Product;
