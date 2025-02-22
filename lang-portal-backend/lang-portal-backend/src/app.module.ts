// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { Word } from './entities/word.entity';
import { Group } from './entities/group.entity';
import { StudyActivity } from './entities/study-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Word, Group, StudyActivity]),
  ],
})
export class AppModule {}