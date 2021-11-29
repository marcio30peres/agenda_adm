import {MigrationInterface, QueryRunner} from "typeorm";

export class InversaoArquivoAgendamentoOTO1638199393281 implements MigrationInterface {
    name = 'InversaoArquivoAgendamentoOTO1638199393281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "arquivo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "mimeType" varchar NOT NULL, "conteudo" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "colaborador" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "telefone" varchar NOT NULL, "email" integer NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "unidade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "tipo_logradouro" varchar NOT NULL, "logradouro" varchar NOT NULL, "numero" integer NOT NULL, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "uf" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "horario" datetime NOT NULL, "status" varchar NOT NULL, "id_colaborador" integer, "id_unidade" integer, "id_arquivo" integer, CONSTRAINT "REL_4c52637bf4b2677cfd08d9f7ba" UNIQUE ("id_arquivo"))`);
        await queryRunner.query(`CREATE TABLE "temporary_agendamento" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "horario" datetime NOT NULL, "status" varchar NOT NULL, "id_colaborador" integer, "id_unidade" integer, "id_arquivo" integer, CONSTRAINT "REL_4c52637bf4b2677cfd08d9f7ba" UNIQUE ("id_arquivo"), CONSTRAINT "FK_2d85a93e1f731ed8c3220cf1f97" FOREIGN KEY ("id_colaborador") REFERENCES "colaborador" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9d12fcfa2374458d9b279cb6bc4" FOREIGN KEY ("id_unidade") REFERENCES "unidade" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4c52637bf4b2677cfd08d9f7ba9" FOREIGN KEY ("id_arquivo") REFERENCES "arquivo" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_agendamento"("id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade", "id_arquivo") SELECT "id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade", "id_arquivo" FROM "agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`ALTER TABLE "temporary_agendamento" RENAME TO "agendamento"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamento" RENAME TO "temporary_agendamento"`);
        await queryRunner.query(`CREATE TABLE "agendamento" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "cpf" varchar NOT NULL, "horario" datetime NOT NULL, "status" varchar NOT NULL, "id_colaborador" integer, "id_unidade" integer, "id_arquivo" integer, CONSTRAINT "REL_4c52637bf4b2677cfd08d9f7ba" UNIQUE ("id_arquivo"))`);
        await queryRunner.query(`INSERT INTO "agendamento"("id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade", "id_arquivo") SELECT "id", "nome", "cpf", "horario", "status", "id_colaborador", "id_unidade", "id_arquivo" FROM "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "temporary_agendamento"`);
        await queryRunner.query(`DROP TABLE "agendamento"`);
        await queryRunner.query(`DROP TABLE "unidade"`);
        await queryRunner.query(`DROP TABLE "colaborador"`);
        await queryRunner.query(`DROP TABLE "arquivo"`);
    }

}
