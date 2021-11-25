import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateColaborador1637853427906 implements MigrationInterface {
    name = 'CreateColaborador1637853427906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "colaborador" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
            "nome" varchar NOT NULL, "cpf" varchar NOT NULL, 
            "telefone" varchar NOT NULL, "email" integer NOT NULL, 
            "status" varchar NOT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "colaborador"`);
    }

}
