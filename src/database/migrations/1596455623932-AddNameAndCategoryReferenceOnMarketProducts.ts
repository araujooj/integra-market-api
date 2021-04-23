import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AddNameReferenceOnMarketProducts1596455623932
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'market_products',
      new TableColumn({
        name: 'product_name',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'market_products',
      new TableColumn({
        name: 'product_category',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('market_products', 'product_name');
    await queryRunner.dropColumn('market_products', 'product_category');
  }
}
