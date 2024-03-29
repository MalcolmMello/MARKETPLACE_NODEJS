import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./Address";
import { CategoryProduct } from "./CategoryProduct";
import { Requests } from "./Request";
import { Responsible } from "./Responsible";

@Entity("company")
export class Companies {
    @PrimaryColumn({ type:"varchar", length: 45 })
    id!: string;
    
    @Column({type: "varchar", length: 40})
    company_name!: string;

    @Column({type: "varchar", length: 60})
    email!: string;

    @Column({type: "char", length: 15})
    phone_number!: string;

    @Column({ type: "char", length: 6 })
    address_number!: string;

    @Column({ type: "char", length: 14, unique: true })
    cnpj!: string;

    @Column({ type:"varchar", length: 45 })
    addressId!: string;
    
    @Column({ type:"varchar", length: 45 })
    responsible_id!: string;

    @Column({ nullable: true })
    description!: string;

    @ManyToOne(() => Address)
    @JoinColumn({ name: "addressId" })
    address!: Address;

    @ManyToOne(() => Responsible)
    @JoinColumn({ name: "responsible_id" })
    responsible!: Responsible; 

    @OneToMany(() => CategoryProduct, (categories_products) => categories_products.company, { eager: true })
    categories_products!: CategoryProduct[];

    @OneToMany(() => Requests, (requests) => requests.company, { eager: true })
    requests!: Requests[];

    @Column({ nullable: true })
    logo!: string;

    @Column({ nullable: true })
    cover!: string;

    @Column()
    isMainCompany!: boolean;

    @Column({ type: "char", length: 12, default: "Em Aprovação"})
    isApproved!: "Em Aprovação" | "Aprovado" | "Rejeitado" | "Suspenso";

    @Column({ nullable: true })
    stripeAccountId!: string;

    @Column({default: false})
    onboardingComplete!: boolean;

    @Column({ type:"float8", nullable: true })
    latitude!: number;

    @Column({ type:"float8", nullable: true })
    longitude!: number;

    @Column({ type:"float8", nullable: true })
    radius!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}