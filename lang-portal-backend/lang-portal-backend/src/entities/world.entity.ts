// src/entities/word.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Word {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kanji: string;

    @Column()
    romaji: string;

    @Column()
    english: string;

    @Column('simple-json')
    parts: object;

    @Column({ default: 0 })
    correct_count: number;

    @Column({ default: 0 })
    wrong_count: number;

    ManyToMany(() => Group, (group: Group) => group.words) // Add explicit type
  @JoinTable({ name: 'word_groups' })
  groups: Group[];
