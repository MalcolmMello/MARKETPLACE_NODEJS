import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./Products";
import { Requests } from "./Request";

@Entity("request_product")
export class RequestProducts {
    @PrimaryColumn()
    id!: string;

    @Column()
    product_id!: string;

    @Column()
    length!: number;

    @Column({ type: "float8" })
    price!: number;

    @ManyToOne(type => Products, requestproducts => RequestProducts)
    product!: Products;

    @ManyToOne(type => Requests, requestproducts => RequestProducts)
    request!: Requests;

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