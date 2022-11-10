import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("admin")
export class Admin {
    @PrimaryColumn()
    id!: string;
    
    @Column({ type:"varchar", length: 60 })
    username!: string;

    @Column({ type:"varchar", length: 70 })
    email!: string;

    @Column()
    password!: string;

    @Column({ type:"char", length: 11 })
    phone_number!: string;

    @CreateDateColumn()
    created_at!: string;

    @UpdateDateColumn()
    updated_at!: string;
    
    constructor() {
        if(!this.id) {
            this.id = uuid()
        };
    };
}