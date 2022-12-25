import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('tb_users')
export class Users {
  @PrimaryColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
