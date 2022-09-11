import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRequests1661087566626 implements MigrationInterface {
    name = 'CreateRequests1661087566626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request_product" ("id" character varying NOT NULL, "product_id" character varying NOT NULL, "length" integer NOT NULL, "price" double precision NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "productId" character varying, "requestId" character varying, CONSTRAINT "PK_c414b20f7c0de73b76ad316fe60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "request" ("id" character varying NOT NULL, "user_id" character varying NOT NULL, "company_id" character varying NOT NULL, "user_address_id" character varying NOT NULL, "status" character varying NOT NULL, "address_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request_product" ADD CONSTRAINT "FK_8f627d94cd6cdb3f394ef1d98ad" FOREIGN KEY ("productId") REFERENCES "company_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request_product" ADD CONSTRAINT "FK_e85ceb0d4c10926ae01d650bef6" FOREIGN KEY ("requestId") REFERENCES "request"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_38554ade327a061ba620eee948b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_38554ade327a061ba620eee948b"`);
        await queryRunner.query(`ALTER TABLE "request_product" DROP CONSTRAINT "FK_e85ceb0d4c10926ae01d650bef6"`);
        await queryRunner.query(`ALTER TABLE "request_product" DROP CONSTRAINT "FK_8f627d94cd6cdb3f394ef1d98ad"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TABLE "request_product"`);
    }

}
