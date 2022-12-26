import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class convictMigration1672038687039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_directorate',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'directorate_name',
            type: 'varchar',
          },
          {
            name: 'roles',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      'tb_directorate',
      new TableForeignKey({
        name: 'FKDirectorateUsers',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_directorate', 'FKDirectorateUsers');
    await queryRunner.dropTable('tb_directorate');
  }
}
