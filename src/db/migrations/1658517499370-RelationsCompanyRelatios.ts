import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationsCompanyRelatios1658517499370 implements MigrationInterface {
    name = 'RelationsCompanyRelatios1658517499370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" character varying NOT NULL, "category_name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies_categories_categories" ("companiesId" character varying NOT NULL, "categoriesId" character varying NOT NULL, CONSTRAINT "PK_815debd801ef621478da65df902" PRIMARY KEY ("companiesId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63040136fd92a59e8f6e367797" ON "companies_categories_categories" ("companiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6dbec7d8c65f2c66fafe390e8d" ON "companies_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "companies_categories_categories" ADD CONSTRAINT "FK_63040136fd92a59e8f6e3677979" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "companies_categories_categories" ADD CONSTRAINT "FK_6dbec7d8c65f2c66fafe390e8d6" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies_categories_categories" DROP CONSTRAINT "FK_6dbec7d8c65f2c66fafe390e8d6"`);
        await queryRunner.query(`ALTER TABLE "companies_categories_categories" DROP CONSTRAINT "FK_63040136fd92a59e8f6e3677979"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6dbec7d8c65f2c66fafe390e8d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63040136fd92a59e8f6e367797"`);
        await queryRunner.query(`DROP TABLE "companies_categories_categories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}