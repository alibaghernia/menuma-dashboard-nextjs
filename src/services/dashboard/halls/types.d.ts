export interface TableEntity {
  uuid: string;
  code: string;
  limit: number;
  description?: null;
  hall_uuid?: null;
  createdAt: string;
  updatedAt: string;
}

export interface IGetItemsFilters extends Partial<IPagination> {
  code?: string;
}
