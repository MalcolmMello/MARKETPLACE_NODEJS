import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedDataBaseStructure1661027556750 implements MigrationInterface {
    name = 'ChangedDataBaseStructure1661027556750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "address_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_address" ("id" character varying NOT NULL, "number" character varying NOT NULL, "street" character varying NOT NULL, "district" character varying NOT NULL, "zip_code" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_product" ("id" character varying NOT NULL, "company_id" character varying NOT NULL, "categoryProductId" character varying NOT NULL, "product_name" character varying NOT NULL, "description" character varying NOT NULL, "front_cover" character varying NOT NULL, "reviews" double precision NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d1efdbeb2c3b018427ed0b02b3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" character varying NOT NULL, "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" character varying NOT NULL, "company_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "address_number" character varying NOT NULL, "logo" character varying NOT NULL, "cover" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "addressId" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_product" ("id" character varying NOT NULL, "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" character varying, CONSTRAINT "PK_f132cc7be455c359ba84d1e7246" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_address_user_address" ("userId" character varying NOT NULL, "userAddressId" character varying NOT NULL, CONSTRAINT "PK_a6993e73380573f9eb58049d700" PRIMARY KEY ("userId", "userAddressId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42d892cea1c110dedf0ade7067" ON "user_address_user_address" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10f2207342919fa62bad4f2dfa" ON "user_address_user_address" ("userAddressId") `);
        await queryRunner.query(`CREATE TABLE "category_companies_company" ("categoryId" character varying NOT NULL, "companyId" character varying NOT NULL, CONSTRAINT "PK_ab871b2bf7e0cf1d9a11b0af552" PRIMARY KEY ("categoryId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dd9638a0f26082ee39c9d43267" ON "category_companies_company" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_71f3e77709d405a25811eb7c19" ON "category_companies_company" ("companyId") `);
        await queryRunner.query(`CREATE TABLE "company_categories_category" ("companyId" character varying NOT NULL, "categoryId" character varying NOT NULL, CONSTRAINT "PK_57a1d127164728229f8eedd50cf" PRIMARY KEY ("companyId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_481198309ba882771da285d7ba" ON "company_categories_category" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33e614fd0cbe4c8bdabe34c5bd" ON "company_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "company_product" ADD CONSTRAINT "FK_2f92209ad6a5ea9f41dbb3cee67" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_product" ADD CONSTRAINT "FK_247c6bbb79e5e1fdf0777f505ce" FOREIGN KEY ("categoryProductId") REFERENCES "category_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_3737905699894299444476dd79c" FOREIGN KEY ("addressId") REFERENCES "user_address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_product" ADD CONSTRAINT "FK_275186d1919d97af80a5e3ea28d" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_address_user_address" ADD CONSTRAINT "FK_42d892cea1c110dedf0ade70673" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_address_user_address" ADD CONSTRAINT "FK_10f2207342919fa62bad4f2dfaa" FOREIGN KEY ("userAddressId") REFERENCES "user_address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" ADD CONSTRAINT "FK_dd9638a0f26082ee39c9d432670" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" ADD CONSTRAINT "FK_71f3e77709d405a25811eb7c196" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_categories_category" ADD CONSTRAINT "FK_481198309ba882771da285d7bac" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_categories_category" ADD CONSTRAINT "FK_33e614fd0cbe4c8bdabe34c5bd3" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_categories_category" DROP CONSTRAINT "FK_33e614fd0cbe4c8bdabe34c5bd3"`);
        await queryRunner.query(`ALTER TABLE "company_categories_category" DROP CONSTRAINT "FK_481198309ba882771da285d7bac"`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" DROP CONSTRAINT "FK_71f3e77709d405a25811eb7c196"`);
        await queryRunner.query(`ALTER TABLE "category_companies_company" DROP CONSTRAINT "FK_dd9638a0f26082ee39c9d432670"`);
        await queryRunner.query(`ALTER TABLE "user_address_user_address" DROP CONSTRAINT "FK_10f2207342919fa62bad4f2dfaa"`);
        await queryRunner.query(`ALTER TABLE "user_address_user_address" DROP CONSTRAINT "FK_42d892cea1c110dedf0ade70673"`);
        await queryRunner.query(`ALTER TABLE "category_product" DROP CONSTRAINT "FK_275186d1919d97af80a5e3ea28d"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_3737905699894299444476dd79c"`);
        await queryRunner.query(`ALTER TABLE "company_product" DROP CONSTRAINT "FK_247c6bbb79e5e1fdf0777f505ce"`);
        await queryRunner.query(`ALTER TABLE "company_product" DROP CONSTRAINT "FK_2f92209ad6a5ea9f41dbb3cee67"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_33e614fd0cbe4c8bdabe34c5bd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_481198309ba882771da285d7ba"`);
        await queryRunner.query(`DROP TABLE "company_categories_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71f3e77709d405a25811eb7c19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd9638a0f26082ee39c9d43267"`);
        await queryRunner.query(`DROP TABLE "category_companies_company"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10f2207342919fa62bad4f2dfa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42d892cea1c110dedf0ade7067"`);
        await queryRunner.query(`DROP TABLE "user_address_user_address"`);
        await queryRunner.query(`DROP TABLE "category_product"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "company_product"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
