import { IPagination } from "@/types";

export interface DiscountEntity {
  uuid: string;
  title: string;
  discount: number;
  description?: null;
  pin: boolean;
  type: discountTypes;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
}

export enum discountTypes {
  CONDITIONAL = "CONDITIONAL",
  NORMAL = "NORMAL",
}
export interface IGetFilters extends Partial<IPagination> {
  search?: string;
  type: string;
}
