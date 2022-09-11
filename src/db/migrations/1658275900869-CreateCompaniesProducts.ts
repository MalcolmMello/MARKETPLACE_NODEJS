import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCompaniesProducts1658275900869 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "companies_products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "company_id",
                        type: "varchar"
                    },
                    {
                        name: "product_name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "front_cover",
                        type: "varchar"
                    },
                    {
                        name: "reviews",
                        type: "float"
                    },
                    {
                        name: "price",
                        type: "float"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_companies",
                        columnNames: ["company_id"],
                        referencedTableName: "companies",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("companies_products");
    }
}







