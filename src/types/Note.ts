export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderDirection {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export enum OrderBy {
  'CREATED' = 'createdAt',
  'UPDATED' = 'updatedAt',
}

export interface SortOrder {
  [OrderBy.CREATED]: OrderDirection;
  [OrderBy.UPDATED]: OrderDirection;
}

export interface DiaryState {
  notes: Note[];
  searchValue: string;
  sortBy: SortOrder;
}
