import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Salesperson } from '../../../../../modules/salesperson/infra/typeorm/entities/salesperson';
import { Directorate } from '../../../../..//modules/directorate/infra/typeorm/entities/directorate';
import { Units } from '../../../../..//modules/units/infra/typeorm/entities/units';

@Entity('tb_sales')
export class Sales {
  @PrimaryColumn()
  id?: string;

  @Column()
  salesperson_id: string;

  @Column()
  unit_id: string;

  @Column()
  directorate_id: string;

  @Column()
  amount: number;

  @Column()
  total_amount: number;

  @Column()
  date_sale: Date;

  @CreateDateColumn()
  create_at: Date;

  @OneToOne(() => Salesperson)
  @JoinColumn({ name: 'salesperson_id' })
  salesperson: Salesperson;

  @OneToOne(() => Units)
  @JoinColumn({ name: 'unit_id' })
  units: Units;

  @OneToOne(() => Directorate)
  @JoinColumn({ name: 'directorate_id' })
  directorate: Directorate;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
