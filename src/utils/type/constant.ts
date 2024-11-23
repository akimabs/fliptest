export enum CONSTANT {
  SUCCESS = 'Berhasil',
  PENDING = 'Pengecekan',
}

export type SortOption =
  | 'urutkan'
  | 'name-asc'
  | 'name-desc'
  | 'date-newest'
  | 'date-oldest';

export type SortOptionItem = {label: string; value: SortOption};
