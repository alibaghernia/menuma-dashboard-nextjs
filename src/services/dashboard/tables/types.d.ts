export interface TableEntity {
  uuid: string;
  code: string;
  capacity: number;
  max_capacity?: number;
  description?: null;
  hall_uuid?: null;
  image?: string;
  image_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetItemsFilters extends Partial<IPagination> {
  code?: string;
}
