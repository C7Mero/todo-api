import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTodoTable1696584336318 implements MigrationInterface {
    name = 'UpdateTodoTable1696584336318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`status\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`status\` varchar(255) NOT NULL`);
    }

}
