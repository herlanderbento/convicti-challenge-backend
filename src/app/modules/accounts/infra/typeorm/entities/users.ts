import { randomUUID } from 'node:crypto';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('tb_users')
export class Users {
  @PrimaryColumn()
  id?: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) this.id = randomUUID();
  }
}
