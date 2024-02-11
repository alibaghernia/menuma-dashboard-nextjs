import { IPagination } from "@/types";

declare interface IGetItemsFilters extends Partial<IPagination> {
  title?: string;
}

declare interface CreatePayload {
  title: string;
  short_description: string;
  long_description: stringک;
  image: string;
  labels: any[];
  soon: boolean;
}
export interface CatalogEntity {
  uuid: string;
  title: string;
  image?: string;
  image_url?: string;
  short_description?: string;
  long_description?: string;
  labels?: LabelsEntity[];
  soon: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface LabelsEntity {
  label: string;
}
