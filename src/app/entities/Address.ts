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
    street!: string;

    @Column({ type:"varchar", length: 40 })
    district!: string;

    @Column({ type:"char", length: 8 })
    zip_code!: string;

    @Column({ type:"varchar", length: 40})
    city!: string;

    @Column({ type:"varchar", length: 30 })
    state!: string;

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