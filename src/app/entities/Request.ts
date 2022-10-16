import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Address";
import { Companies } from "./Company";
import { RequestProducts } from "./RequestProduct";
import { Status } from "./Status";
import { User } from "./User";

@Entity("request")
export class Requests {
    @PrimaryColumn()
    id!: string;

    @Column()
    userId!: string;

    @Column()
    company_id!: string;

    @Column()
    user_address_id!: string;

    @Column({ type: "varchar"})
    status_id!: string;

    @ManyToOne(() => Status, { eager: true })
    @JoinColumn({ name: "status_id" })
    status!: Status; 

    @Column()
    address_number!: string;

    @Column({ type: "float8" })
    total!: number;

    @Column()
    isDelivery!: boolean;

    @ManyToOne(() => Companies )
    @JoinColumn({ name: "company_id" })
    company!: Companies;
    
    @ManyToOne(type => User, request => Requests, { eager: true })
    user!: User;

    @ManyToOne(() => Address, request => Requests, { eager: true })
    @JoinColumn({ name: "user_address_id" })
    address!: Address;

    @OneToMany(() => RequestProducts, (requestProducts) => requestProducts.request, { eager: true })
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