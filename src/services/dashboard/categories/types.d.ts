export interface Category {
  uuid: string;
  parent_uuid?: null;
  title: string;
  slug?: null;
  image: string;
  image_url?: string;
  products_count: number;
}

export interface IGetItemsFilters {
  page: number;
  limit: number;
  name?: string;
}
