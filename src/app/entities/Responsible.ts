import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Companies } from "./Company";

@Entity("responsible")
export class Responsible {
    @PrimaryColumn({ type:"varchar", length: 45 })
    id!: string;
    
    @Column({type:"varchar", length: 60})
    responsible_name!: string;

    @Column({type: "varchar", length: 60})
    email!: string;

    @Column()
    password!: string;

    @Column({type: "char", length: 15})
    phone_number!: string;
    
    @Column({type: "char", length: 15, unique: true})
    rg!: string;

    @Column({type: "char", length: 11, unique: true})
    cpf!: string;

    @OneToMany(() => Companies, (companies) => companies.responsible, { eager: true })
    companies!: Companies[];

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