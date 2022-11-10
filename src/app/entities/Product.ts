import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CategoryProduct } from "./CategoryProduct";
import { Companies } from "./Company";

@Entity("company_product")
export class Products {
    @PrimaryColumn({ type:"varchar", length: 45 })
    id!: string;
    
    @Column({ type:"varchar", length: 45 })
    company_id!: string;

    @Column({ type:"varchar", length: 45 })
    categoryProductId!: string;

    @ManyToOne(() => Companies)
    @JoinColumn({ name: "company_id" })
    companies!: Companies; 

    @ManyToOne(type => CategoryProduct, products => Products)
    category_product!: CategoryProduct;

    @Column({ type:"varchar", length: 40 })
    product_name!: string;

    @Column()
    description!: string;

    @Column({ nullable: true })
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