import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const connection = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  migrationsRun: false,
  entities: [`./src/app/modules/**/infra/typeorm/entities/*.{ts,js}`],
  migrations: [`./src/shared/infra/typeorm/migrations/*.ts`],
});
