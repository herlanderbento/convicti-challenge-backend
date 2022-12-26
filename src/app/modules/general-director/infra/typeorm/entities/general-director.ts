import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('tb_general_director')
export class GeneralDirector {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
