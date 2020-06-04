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
class PublicProduct {
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

    @ManyToOne(() => User, user => user.publicProducts, { eager: true })
    @JoinColumn({ name: 'public_products' })
    market: User;

    @Column()
    promotion: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default PublicProduct;
