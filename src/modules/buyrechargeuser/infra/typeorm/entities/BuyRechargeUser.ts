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
import { Exclude } from 'class-transformer';

import { RechargePhone } from '@modules/rechargephone/infra/typeorm/entities/RechargePhone';
import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('buyrechargeuser')
class BuyRechargeUser {
  @PrimaryColumn()
  id: string;

  @Column()
  telephone: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: string;

  @Column()
  rechargephone_id: string;

  @ManyToOne(() => RechargePhone)
  @JoinColumn({ name: 'rechargephone_id' })
  rechargephone: string;

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

export { BuyRechargeUser };
