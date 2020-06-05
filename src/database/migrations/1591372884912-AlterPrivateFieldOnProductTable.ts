import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AlterPrivateFieldOnProductTable1591372884912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('products', 'private');

        await queryRunner.addColumn('products', new TableColumn({
            name: 'secret',
            type: 'boolean',
            default: false
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('products', new TableColumn({
            name: 'private',
            type: 'boolean',
            default: false

        }));

        await queryRunner.dropColumn('products', 'secret');
    }

}
