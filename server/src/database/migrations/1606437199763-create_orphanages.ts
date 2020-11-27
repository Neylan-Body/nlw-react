import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1606437199763 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
                {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                },
                {
                name: 'name',
                type: 'varchar',
                },
                {
                name: 'latitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
                },
                {
                name: 'longitude',
                type: 'decimal',
                scale: 10,
                precision: 2,
                },
                {
                name: 'about',
                type: 'text',
                },
                {
                name: 'whatsapp',
                type: 'text',
                },
                {
                name: 'instructions',
                type: 'text',
                },
                {
                name: 'opening_hours',
                type: 'varchar'
                },
                {
                name: 'open_on_weekends',
                type: 'boolean',
                default: false,
                },
            ],
            uniques: [
                {
                    name: 'UNIQUE_ORPHANAGES',
                    columnNames: ['latitude','longitude'],
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages');
    }

}
