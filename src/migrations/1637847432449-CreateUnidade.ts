import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUnidade1637847432449 implements MigrationInterface {
    name = 'CreateUnidade1637847432449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unidade" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
            "nome" varchar NOT NULL, 
            "tipo_logradouro" varchar NOT NULL, 
            "logradouro" varchar NOT NULL, 
            "numero" integer NOT NULL, 
            "bairro" varchar NOT NULL, 
            "cidade" varchar NOT NULL, 
            "estado" varchar NOT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "unidade"`);
    }

}
