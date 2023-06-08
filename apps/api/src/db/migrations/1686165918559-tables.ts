import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1686165918559 implements MigrationInterface {
    name = 'Tables1686165918559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_entity" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '2023-06-07T19:25:19.875Z', "address" character varying(150) NOT NULL, "subject" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_2173737e965d2e86cfe7ad16d28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '2023-06-07T19:25:19.875Z', "email" character varying(150) NOT NULL, "username" character varying(150) NOT NULL, "password" character varying NOT NULL, "roleId" bigint, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" BIGSERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '2023-06-07T19:25:19.875Z', "name" character varying(50) NOT NULL, CONSTRAINT "UQ_61db0b4faa9a193b713c7f952e1" UNIQUE ("name"), CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2" FOREIGN KEY ("roleId") REFERENCES "role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_95ab8e7157a5bb4bc0e51aefdd2"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "email_entity"`);
    }

}
