export interface HallEntity {
  uuid: string;
  code: string;
  capacity: number;
  max_capacity?: number;
  image?: string;
  image_url?: string;
  description?: null;
  createdAt: string;
  updatedAt: string;
}

export interface IGetItemsFilters extends Partial<IPagination> {
  code?: string;
}
