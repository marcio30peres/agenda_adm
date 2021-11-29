import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinedTables1638184746325 implements MigrationInterface {
    name = 'JoinedTables1638184746325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "colaborador" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "telefone" varchar NOT NULL, "email" integer NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "unidade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "tipo_logradouro" varchar NOT NULL, "logradouro" varchar NOT NULL, "numero" integer NOT NULL, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "uf" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "horario" datetime NOT NULL, "status" varchar NOT NULL, "id_colaborador" integer, "id_unidade" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_agendamento" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "horario" datetime NOT NULL, "status" varchar NOT NULL, "id_colaborador" integer, "id_unidade" integer, CONSTRAINT "FK_2d85a93e1f731ed8c3220cf1f97" FOREIGN KEY ("id_colaborador") REFERENCES "colaborador" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9d12fcfa2374458d9b279cb6bc4" FOREIGN KEY ("id_unidade") REFERENCES "unidade" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_agendamento"("id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade") SELECT "id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade" FROM "agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_agendamento" RENAME TO "agendamento"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" RENAME TO "temporary_agendamento"`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "horario" datetime NOT NULL, "status" varchar NOT NULL, "id_colaborador" integer, "id_unidade" integer)`);
        await queryRunner.query(`INSERT INTO "agendamento"("id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade") SELECT "id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade" FROM "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`DROP TABLE "unidade"`);
        await queryRunner.query(`DROP TABLE "colaborador"`);
    }

}
