import { randomUUID } from 'node:crypto';
import { Users } from '../../../../accounts/infra/typeorm/entities/users';
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Units } from '../../../../../modules/units/infra/typeorm/entities/units';

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

  @OneToOne(() => Units)
  @JoinColumn({ name: 'unit_id' })
  units: Units;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
