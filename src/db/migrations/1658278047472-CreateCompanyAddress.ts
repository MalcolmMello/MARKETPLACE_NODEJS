import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCompanyAddress1658278047472 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "companies_addresses",
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
                        name: "number",
                        type: "varchar"
                    },
                    {
                        name: "street",
                        type: "varchar"
                    },
                    {
                        name: "district",
                        type: "varchar"
                    },
                    {
                        name: "zip_code",
                        type: "varchar"
                    },
                    {
                        name: "city",
                        type: "varchar"
                    },
                    {
                        name: "state",
                        type: "varchar"
                    },
                    {
                        name: "country",
                        type: "varchar"
                    },
                    {
                        name: "latitude",
                        type: "float"
                    },
                    {
                        name: "longitude",
                        type: "float"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
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
        await queryRunner.dropTable("companies_addresses");
    }

}
