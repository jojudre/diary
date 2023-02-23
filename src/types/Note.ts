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

export interface SortOrder {
    createdAt: OrderDirection;
    updatedAt: OrderDirection;
}

export interface DiaryState {
    notes: Note[];
    searchValue: string;
    sortBy: SortOrder;
}
