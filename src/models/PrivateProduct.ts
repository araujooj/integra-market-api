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

@Entity()
class PrivateProduct {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    image: string;

    @ManyToOne(() => User, user => user.privateProducts, { eager: true })
    @JoinColumn({ name: 'private_products' })
    market: User;

    @Column()
    promotion: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default PrivateProduct;
