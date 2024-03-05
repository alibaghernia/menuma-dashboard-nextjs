import { Business } from "../types";

export interface Category {
  uuid: string;
  parent_uuid?: null;
  title: string;
  slug?: null;
  image: string;
  order: number;
  image_url?: string;
  products_count: number;
  business?: Business;
}
export interface IGetFilters {
  page?: number;
  limit?: number;
  title?: string;
  business_uuid?: string;
  [x: string]: any;
}
