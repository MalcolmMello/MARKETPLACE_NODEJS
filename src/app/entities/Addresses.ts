import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, OneToMany, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Companies } from "./Companies";
import { User } from "./User";

@Entity("address")
export class Address {
    @PrimaryColumn()
    id!: string;

    @ManyToMany(type => User)
    user!: User[];

    @OneToMany(type => Companies, address => Address)
    companies!: Companies[];

    @Column()
    street!: string;

    @Column()
    district!: string;

    @Column()
    zip_code!: string;

    @Column()
    city!: string;

    @Column()
    state!: string;

    @Column()
    country!: string;

    @Column({ type:"float8" })
    latitude!: number;

    @Column({ type:"float8" })
    longitude!: number;

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