import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCnpjField1661118367147 implements MigrationInterface {
    name = 'CreateCnpjField1661118367147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "cnpj" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "logo" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "cover" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "cover" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "logo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "cnpj"`);
    }

}
