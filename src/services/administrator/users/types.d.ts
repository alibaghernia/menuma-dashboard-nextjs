declare interface GetItemsFilters {
  page?: number;
  limit?: number;
  search?: string;
}

declare interface CreateUserPayload {
  first_name: string;
  last_name: string;
  mobile: string;
  role: string;
  password: string;
}

declare interface GetManagersFilters {
  no_business?: boolean;
}
