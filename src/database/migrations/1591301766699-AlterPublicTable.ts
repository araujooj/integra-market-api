import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn } from "typeorm";

export default class AlterPublicTable1591301766699 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('products', new TableColumn({
            name: 'market_id',
            type: 'uuid',
            isNullable: true,

        }));

        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'ProductsMarket',
            columnNames: ['market_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductsMarket');

        await queryRunner.dropColumn('products', 'market_id');
    }

}
