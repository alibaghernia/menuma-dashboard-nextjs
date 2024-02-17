export interface CustomerEntity {
  uuid: string;
  first_name: string;
  last_name: string;
  gender: string;
  mobile: string;
  description: string;
  birth_date: string;
  business_uuid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IGetItemsFilters extends Partial<IPagination> {
  search?: string;
}
