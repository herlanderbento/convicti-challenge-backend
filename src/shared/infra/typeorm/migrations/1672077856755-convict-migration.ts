import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class convictMigration1672077856755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tb_sales',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'salesperson_id',
            type: 'uuid',
          },
          {
            name: 'unit_id',
            type: 'uuid',
          },
          {
            name: 'directorate_id',
            type: 'uuid',
          },
          {
            name: 'amount',
            type: 'numeric',
          },
          {
            name: 'total_amount',
            type: 'numeric',
          },
          {
            name: 'date_sale',
            type: 'date',
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
      'tb_sales',
      new TableForeignKey({
        name: 'FKSalesSalesperson',
        columnNames: ['salesperson_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_salesperson',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'tb_sales',
      new TableForeignKey({
        name: 'FKSalesUnits',
        columnNames: ['unit_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_units',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'tb_sales',
      new TableForeignKey({
        name: 'FKSalesDirectorate',
        columnNames: ['directorate_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tb_directorate',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tb_sales', 'FKSalesSalesperson');
    await queryRunner.dropForeignKey('tb_sales', 'FKSalesUnits');
    await queryRunner.dropForeignKey('tb_sales', 'FKSalesDirectorate');
    await queryRunner.dropColumns('tb_sales', [
      'salesperson_id',
      'unit_id',
      'directorate_id',
    ]);
    await queryRunner.dropTable('tb_sales');
  }
}
