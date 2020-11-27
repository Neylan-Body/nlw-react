import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsers1606437636734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
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
                name: 'email',
                type: 'varchar',
                },
                {
                name: 'password',
                type: 'varchar',
                },
            ],
            uniques: [
                {
                    name: 'UNIQUE_USERS',
                    columnNames: ['email'],
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
