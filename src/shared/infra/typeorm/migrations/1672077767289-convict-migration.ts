import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class convictMigration1672077767289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_salesperson',
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
            name: 'unit_id',
            type: 'uuid',
          },
          {
            name: 'name',
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
      'tb_salesperson',
      new TableForeignKey({
        name: 'FKSalespersonUsers',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'tb_salesperson',
      new TableForeignKey({
        name: 'FKSalespersonUnits',
        columnNames: ['unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_units',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_salesperson', 'FKSalespersonUsers');
    await queryRunner.dropForeignKey('tb_salesperson', 'FKSalespersonUnits');
    await queryRunner.dropColumns('tb_salesperson', ['user_id', 'unit_id']);
    await queryRunner.dropTable('tb_salesperson');
  }
}
