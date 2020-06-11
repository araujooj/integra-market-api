import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddSecretToCategoryTable1591885087608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.addColumn('categories', new TableColumn({
            name: 'secret',
            type: 'boolean',
            default: false
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('categories', 'secret');
    }
}
