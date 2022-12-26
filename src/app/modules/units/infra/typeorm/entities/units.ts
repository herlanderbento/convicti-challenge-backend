import { randomUUID } from 'node:crypto';
import { Directorate } from '../../../../../modules/directorate/infra/typeorm/entities/directorate';

import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('tb_units')
export class Units {
  @PrimaryColumn()
  id?: string;

  @Column()
  directorate_id: string;

  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  manager: string;

  @Column()
  directorate: string;

  @CreateDateColumn()
  create_at: Date;

  @ManyToOne(() => Directorate)
  @JoinColumn({ name: 'directorate_id' })
  Directorate: Directorate;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
