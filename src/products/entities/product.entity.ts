import { Category } from '../../categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'varchar', length: 60 })
    name: string

    @Column({ type: 'varchar', length: 120, nullable: true, default: 'default.svg' })
    image: string

    @Column('decimal')
    price: number

    @Column('int')
    inventory: number

    @Column({ type: 'int' })
    categoryId: number

    @ManyToOne(() => Category)
    category: Category
}