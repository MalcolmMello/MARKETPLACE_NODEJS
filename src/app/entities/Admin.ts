import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("admin")
export class Admin {
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