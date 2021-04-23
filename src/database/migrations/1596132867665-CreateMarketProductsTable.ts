import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMarketProductsTable1596132867665
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'market_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'market_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'secret',
            type: 'boolean',
            default: false,
          },
          {
            name: 'promotion',
            type: 'boolean',
            default: false,
          },
          {
            name: 'quantity',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('market_products');
  }
}
