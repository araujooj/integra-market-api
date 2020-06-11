import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import Category from './Category'
import Market from "./Market";

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

    @ManyToOne(() => Category, category => category.product, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column()
    secret: boolean;

    @ManyToOne(() => Market, market => market.products, { eager: false })
    @JoinColumn({ name: 'market_id' })
    market: Market;

    //* quantity: "KG" | "G" | "UN" */

    @Column()
    promotion: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Product;
