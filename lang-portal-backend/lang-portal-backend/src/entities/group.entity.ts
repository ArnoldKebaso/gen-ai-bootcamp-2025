// src/entities/group.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Word } from './word.entity'; // Fixed path

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  words_count: number;

  @ManyToMany(() => Word, (word: Word) => word.groups) // Add type annotation
  words: Word[];
}
