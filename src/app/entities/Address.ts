import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, OneToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Companies } from "./Company";
import { User } from "./User";

@Entity("address")
export class Address {
    @PrimaryColumn()
    id!: string;

    @ManyToMany(type => User)
    user!: User[];

    @OneToMany(type => Companies, address => Address)
    companies!: Companies[];

    @Column({ type:"varchar", length: 70 })
    display_name!: string;

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