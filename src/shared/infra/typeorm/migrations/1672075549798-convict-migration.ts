import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class convictMigration1672075549798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_units',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'directorate_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'varchar',
          },
          {
            name: 'longitude',
            type: 'varchar',
          },
          {
            name: 'manager',
            type: 'varchar',
          },
          {
            name: 'directorate',
            type: 'varchar',
          },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'tb_units',
      new TableForeignKey({
        name: 'FKUnitsDirectorate',
        columnNames: ['directorate_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_directorate',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_units', 'FKUnitsDirectorate');
    await queryRunner.dropColumn('tb_units', 'directorate_id');
    await queryRunner.dropTable('tb_units');
  }
}
