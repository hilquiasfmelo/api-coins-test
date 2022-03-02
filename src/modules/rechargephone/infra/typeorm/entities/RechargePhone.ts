import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('rechargephone')
class RechargePhone {
  @PrimaryColumn()
  id: string;

  @Column()
  operator: string;

  @Column()
  value: number;

  @Column()
  howtouse: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  /**
   * The ID generation is the responsibility
   * of the application and not the TypeORM.
   */
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { RechargePhone };
