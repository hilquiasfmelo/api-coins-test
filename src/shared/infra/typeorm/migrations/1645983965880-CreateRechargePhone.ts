import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRechargePhone1645983965880 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rechargephone',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'operator',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'float',
          },
          {
            name: 'howtouse',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rechargephone');
  }
}
