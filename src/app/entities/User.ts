import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, JoinTable, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Address";

@Entity("user")
export class User {
    @PrimaryColumn()
    id!: string;
    
    @Column({ type:"varchar", length: 45 })
    username!: string;

    @Column({ type:"varchar", length: 60 })
    email!: string;

    @Column()
    password!: string;

    @Column({ type:"char", length: 15 })
    phone_number!: string;
    
    @Column({ type: "char", length: 6, nullable: true })
    address_number?: string;

    @ManyToMany(type => Address, { eager: true })
    @JoinTable()
    address!: Address[];

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