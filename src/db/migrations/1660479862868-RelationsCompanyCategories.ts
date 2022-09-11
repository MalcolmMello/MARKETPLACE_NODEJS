import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationsCompanyCategories1660479862868 implements MigrationInterface {
    name = 'RelationsCompanyCategories1660479862868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_products" ADD "company_id" character varying`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_5026d390fac245b18a503a225d3" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_5026d390fac245b18a503a225d3"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP COLUMN "company_id"`);
    }

}
