import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CategoryProduct } from "./CategoriesProducts";
import { Companies } from "./Companies";

@Entity("company_product")
export class Products {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    company_id!: string;

    @Column()
    categoryProductId!: string;

    @ManyToOne(() => Companies)
    @JoinColumn({ name: "company_id" })
    companies!: Companies; 

    @ManyToOne(type => CategoryProduct, products => Products)
    category_product!: CategoryProduct;

    @Column()
    product_name!: string;

    @Column()
    description!: string;

    @Column()
    front_cover!: string;

    @Column({ type: "float8" })
    reviews!: number;

    @Column({ type: "float8" })
    price!: number;

    @CreateDateColumn()
    created_at!: string;

    @UpdateDateColumn()
    updated_at!: string;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}