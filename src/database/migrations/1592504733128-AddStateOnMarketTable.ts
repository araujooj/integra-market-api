import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStateOnMarketTable1592504733128
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'market',
      new TableColumn({
        name: 'uf',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('market', 'uf');
  }
}
