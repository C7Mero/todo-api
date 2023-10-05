import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTodoTable1696415487442 implements MigrationInterface {
    name = 'UpdateTodoTable1696415487442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`status\``);
    }

}
