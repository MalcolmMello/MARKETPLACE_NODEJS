import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewRelationsCategoriesProducts1658583987220 implements MigrationInterface {
    name = 'CreateNewRelationsCategoriesProducts1658583987220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_products" DROP CONSTRAINT "FK_173891b721ec1083f205278e07b"`);
        await queryRunner.query(`ALTER TABLE "categories_products" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "companies_products" ADD "categoryProductId" character varying`);
        await queryRunner.query(`ALTER TABLE "companies_products" ADD CONSTRAINT "FK_c6d47029e7ae672a96c557c5b41" FOREIGN KEY ("categoryProductId") REFERENCES "categories_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_products" DROP CONSTRAINT "FK_c6d47029e7ae672a96c557c5b41"`);
        await queryRunner.query(`ALTER TABLE "companies_products" DROP COLUMN "categoryProductId"`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD "productsId" character varying`);
        await queryRunner.query(`ALTER TABLE "categories_products" ADD CONSTRAINT "FK_173891b721ec1083f205278e07b" FOREIGN KEY ("productsId") REFERENCES "companies_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
