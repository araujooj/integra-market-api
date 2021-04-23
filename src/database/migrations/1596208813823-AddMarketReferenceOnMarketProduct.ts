import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AddMarketReferenceOnMarketProduct1596208813823
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'market_products',
      new TableForeignKey({
        name: 'MarketProductsFK',
        columnNames: ['market_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'market',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'market_products',
      new TableForeignKey({
        name: 'ProductsMarketFK',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('market_products', 'MarketProductsFK');
    await queryRunner.dropForeignKey('market_products', 'ProductsMarketFK');
  }
}
