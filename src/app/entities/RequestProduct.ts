import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./Product";
import { Requests } from "./Request";

@Entity("request_product")
export class RequestProducts {
    @PrimaryColumn()
    id!: string;

    @Column()
    productId!: string;

    @Column()
    requestId!: string;

    @Column()
    length!: number;

    @Column({ type: "float8" })
    price!: number;

    @ManyToOne(type => Products, requestproducts => RequestProducts, { eager: true })
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