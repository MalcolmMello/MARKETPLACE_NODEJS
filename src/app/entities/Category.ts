import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { CategoryProduct } from "./CategoryProduct";
import { Companies } from "./Company";
import { Products } from "./Product";

@Entity("category")
export class Categories {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    category_name!: string;

    @ManyToMany(type => Companies, { eager: true })
    @JoinTable()
    companies!: Companies[];

    @OneToMany(type => CategoryProduct, categories => Categories)
    categories_product!: CategoryProduct[];

    @OneToMany(type => Products, categories => Categories)
    products!: Products[];

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