import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Requests } from "./Request";

@Entity("status")
export class Status {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    status_name!: "Pronto para retirada" | "Em preparo" | "Concluído" | "Em aberto" | "Cancelado" | "Em aberto" | "Saiu para entrega";

    @OneToMany(() => Requests, (request) => request.status)
    requests!: Requests[];

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