import { randomUUID } from 'node:crypto';
import { Users } from '../../../../accounts/infra/typeorm/entities/users';
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Units } from '@app/modules/units/infra/typeorm/entities/units';

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

  @OneToMany(() => Units, (Units) => Units.directorate)
  @JoinTable({
    joinColumns: [{ name: 'directorate_id' }],
  })
  units: Units[];

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
