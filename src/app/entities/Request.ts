import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Address";
import { Companies } from "./Company";
import { RequestProducts } from "./RequestProduct";
import { Status } from "./Status";
import { User } from "./User";

@Entity("request")
export class Requests {
    @PrimaryColumn({ type:"varchar", length: 45 })
    id!: string;

    @Column({ type:"varchar", length: 45 })
    userId!: string;

    @Column({ type:"varchar", length: 45 })
    company_id!: string;

    @Column({ type:"varchar", length: 45 })
    user_address_id!: string;

    @Column({ type: "varchar", length: 45})
    status_id!: string;

    @ManyToOne(() => Status, { eager: true })
    @JoinColumn({ name: "status_id" })
    status!: Status; 

    @Column({ type:"char", length: 6 })
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

    @Column({ type:"float8", nullable: true })
    latitude!: number;

    @Column({ type:"float8", nullable: true })
    longitude!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}