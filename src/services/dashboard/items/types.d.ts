export interface Product {
  uuid: string;
  title: string;
  description: string;
  metadata?: string[];
  prices?: PricesEntity[];
  createdAt: string;
  updatedAt: string;
  categories?: CategoriesEntity[];
  image_url?: string;
  images?: { uuid: string }[];
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
  title?: string;
}
