import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class BuyRechargeUser1646070023535 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'buyrechargeuser',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'telephone',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'rechargephone_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'buyrechargeuser',
      new TableForeignKey({
        name: '(FK)BuyrechargeUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'buyrechargeuser',
      new TableForeignKey({
        name: '(FK)BuyrechargeuserRechargePhone',
        columnNames: ['rechargephone_id'],
        referencedTableName: 'rechargephone',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'buyrechargeuser',
      '(FK)BuyrechargeuserRechargePhone',
    );

    await queryRunner.dropForeignKey('buyrechargeuser', '(FK)BuyrechargeUser');

    await queryRunner.dropTable('buyrechargeuser');
  }
}
