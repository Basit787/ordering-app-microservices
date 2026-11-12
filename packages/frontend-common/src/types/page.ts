// Mirrors Page<T> in apps/server/libs/common/src/dto/pagination-query.dto.ts
export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};

export type PageQuery = { page?: number; pageSize?: number };
