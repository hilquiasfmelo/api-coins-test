import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('transactions')
class Transaction {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  type: 'income' | 'outcome';

  @Column()
  balance: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: string;

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

export { Transaction };
