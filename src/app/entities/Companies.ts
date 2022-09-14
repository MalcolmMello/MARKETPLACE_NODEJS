import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Addresses";
import { Categories } from "./Categories";
import { CategoryProduct } from "./CategoriesProducts";
import { Requests } from "./Request";

@Entity("company")
export class Companies {
    @PrimaryColumn()
    id!: string;
    
    @Column()
    company_name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone_number!: string;

    @Column()
    address_number!: string;

    @Column()
    cnpj!: string;

    @Column()
    addressId!: string;

    @ManyToMany(type => Categories)
    @JoinTable()
    categories!: Categories[];

    @ManyToOne(() => Address)
    @JoinColumn({ name: "addressId" })
    address!: Address;

    @OneToMany(() => CategoryProduct, (categories_products) => categories_products.company, { eager: true })
    categories_products!: CategoryProduct[];

    @OneToMany(() => Requests, (requests) => requests.company, { eager: true })
    requests!: Requests[];

    @Column({ nullable: true })
    logo!: string;

    @Column({ nullable: true })
    cover!: string;

    @Column({ type: "varchar", default: "Em Aprovação"})
    isApproved!: "Em Aprovação" | "Aprovado" | "Rejeitado" | "Suspenso";

    @CreateDateColumn()
    created_at!: string;

    @UpdateDateColumn()
    updated_at!: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}