import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddCitToMarketTable1591902343925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await queryRunner.addColumn('market', new TableColumn({
            name: 'city',
            type: 'varchar'
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn('market', 'city');
    }

}
