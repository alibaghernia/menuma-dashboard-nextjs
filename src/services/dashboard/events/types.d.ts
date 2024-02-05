export interface EventEntity {
  uuid: string;
  title: string;
  start_at: string;
  end_at?: null;
  limit?: null;
  banner_uuid?: string;
  banner_url?: string;
  image_url?: string;
  short_description?: null;
  long_description?: null;
  organizer_type: string;
  organizer_uuid: string;
  cycle: string;
  price: number;
  pin: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
}

export interface IGetItemsFilters extends Partial<IPagination> {
  title?: string;
  pin?: boolean;
}
