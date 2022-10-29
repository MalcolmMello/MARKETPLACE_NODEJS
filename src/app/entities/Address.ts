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

    @Column({default: 'Brasil'})
    country!: string;

    @Column({ type:"float8", nullable: true })
    latitude!: number;

    @Column({ type:"float8", nullable: true })
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