import { randomUUID } from 'node:crypto';

import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Units } from '../../../../../modules/units/infra/typeorm/entities/units';
import { Users } from '../../../../accounts/infra/typeorm/entities/users';

@Entity('tb_salesperson')
export class Salesperson {
  @PrimaryColumn()
  id?: string;

  @Column()
  user_id: string;

  @Column()
  unit_id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  create_at: Date;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  users: Users;

  @ManyToOne(() => Units)
  @JoinColumn({ name: 'unit_id' })
  units: Units;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
