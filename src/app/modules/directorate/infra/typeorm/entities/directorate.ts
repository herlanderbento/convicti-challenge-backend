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

@Entity('tb_directorate')
export class Directorate {
  @PrimaryColumn()
  id?: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  directorate_name: string;

  @Column()
  roles: string;

  @CreateDateColumn()
  create_at: Date;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  users: Users;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
