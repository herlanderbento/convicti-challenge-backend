import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
  synchronize: true,
  migrationsRun: false,
  entities: [],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
});
