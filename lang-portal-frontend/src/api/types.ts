export interface Word {
  id: number;
  kanji: string;
  romaji: string;
  english: string;
  correct_count: number;
  wrong_count: number;
}

export interface Group {
  id: number;
  name: string;
  words_count: number;
}