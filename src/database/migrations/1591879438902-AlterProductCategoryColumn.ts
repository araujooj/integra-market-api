import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProductCategoryColumn1591879438902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products', 'category');

        await queryRunner.addColumn('products', new TableColumn({
            name: 'category_id',
            type: 'uuid',
            isNullable: true,

        }));

        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'ProductCategory',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products', 'ProductCategory');

        await queryRunner.dropColumn('products', 'category_id');

        await queryRunner.addColumn('products', new TableColumn({
            name: 'category',
            type: 'varchar',
            isNullable: false,
        }));
    }

}
