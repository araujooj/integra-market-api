import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddQuantityToProducts1591904690537 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('products', new TableColumn({
            name: 'quantity',
            type: 'float'
        }));

        await queryRunner.addColumn('products', new TableColumn({
            name: 'unit',
            type: 'varchar'
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('products', 'quantity');

        await queryRunner.dropColumn('products', 'unit');
    }

}
