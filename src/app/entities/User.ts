import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany, ManyToMany, JoinTable, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Addresses";
import { Requests } from "./Request";

@Entity("user")
export class User {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone_number!: string;
    
    @Column({ nullable: true })
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