import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationsCategoriesProducts1658521617576 implements MigrationInterface {
    name = 'CreateRelationsCategoriesProducts1658521617576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories_products" ("id" character varying NOT NULL, "category_name" character varying NOT NULL, "productsId" character varying, CONSTRAINT "PK_f36b593bfdcdbee50ed210b6d36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_173891b721ec1083f205278e07b" FOREIGN KEY ("productsId") REFERENCES "companies_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_173891b721ec1083f205278e07b"`);
        await queryRunner.query(`DROP TABLE "categories_products"`);
    }

}
