import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { RequestProducts } from "./RequestProduct";
import { User } from "./User";

@Entity("request")
export class Requests {
    @PrimaryColumn()
    id!: string;

    @Column()
    user_id!: string;

    @Column()
    company_id!: string;

    @Column()
    user_address_id!: string;

    @Column()
    status!: string

    @Column()
    address_number!: string;
    
    @ManyToOne(type => User, request => Requests)
    user!: User;

    @OneToMany(type => RequestProducts, request => Requests)
    request_products!: RequestProducts[];

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