import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUnidade1637849770654 implements MigrationInterface {
    name = 'CreateUnidade1637849770654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_unidade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "tipo_logradouro" varchar NOT NULL, "logradouro" varchar NOT NULL, "numero" integer NOT NULL, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "uf" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_unidade"("id", "nome", "tipo_logradouro", "logradouro", "numero", "bairro", "cidade", "uf") SELECT "id", "nome", "tipo_logradouro", "logradouro", "numero", "bairro", "cidade", "estado" FROM "unidade"`);
        await queryRunner.query(`DROP TABLE "unidade"`);
        await queryRunner.query(`ALTER TABLE "temporary_unidade" RENAME TO "unidade"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unidade" RENAME TO "temporary_unidade"`);
        await queryRunner.query(`CREATE TABLE "unidade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "nome" varchar NOT NULL, "tipo_logradouro" varchar NOT NULL, "logradouro" varchar NOT NULL, "numero" integer NOT NULL, "bairro" varchar NOT NULL, "cidade" varchar NOT NULL, "estado" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "unidade"("id", "nome", "tipo_logradouro", "logradouro", "numero", "bairro", "cidade", "estado") SELECT "id", "nome", "tipo_logradouro", "logradouro", "numero", "bairro", "cidade", "uf" FROM "temporary_unidade"`);
        await queryRunner.query(`DROP TABLE "temporary_unidade"`);
    }

}
