export interface Product {
  uuid: string;
  title: string;
  description: string;
  metadata?: string[] | null;
  prices?: PricesEntity[] | null;
  createdAt: string;
  updatedAt: string;
  categories?: CategoriesEntity[] | null;
}
export interface PricesEntity {
  title: string;
  value: number;
}
export interface CategoriesEntity {
  uuid: string;
  parent_uuid?: null;
  title: string;
  slug?: null;
  image?: null;
}

export interface IGetProductFilters {
  page: number;
  limit: number;
  name?: string;
}
