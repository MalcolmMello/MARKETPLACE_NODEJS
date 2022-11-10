import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Companies } from "./Company";
import { Products } from "./Product";

@Entity("category_product")
export class CategoryProduct {
    @PrimaryColumn({ type:"varchar", length: 45 })
    id!: string;
    
    @Column({ type:"varchar", length: 40 })
    category_name!: string;

    @OneToMany(() => Products, (categoryproduct) => categoryproduct.category_product, { eager: true })
    products!: Products[];

    @Column({ type:"varchar", length: 45 })
    company_id!: string;

    @ManyToOne(() => Companies)
    @JoinColumn({ name: "company_id" })
    company!: Companies; 

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