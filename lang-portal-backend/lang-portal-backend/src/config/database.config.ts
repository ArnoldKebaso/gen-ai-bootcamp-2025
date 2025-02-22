// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DB_PATH || 'lang-portal.db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false, // Temporarily disable logging
  migrations: [],
  migrationsRun: false,
  retryAttempts: 1,
};