declare interface GetAllItemsFilter {
  page?: number;
  limit?: number;
  title?: string;
}
export interface Business {
  uuid: string;
  name: string;
  slug: string;
  status: string;
  address: string;
  description: string;
  location_lat: string;
  location_long: string;
  phone_number: string;
  email: string;
  working_hours?: WorkingHoursEntity[] | null;
  logo: string;
  banner: string;
  pager: boolean;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  socials?: SocialsEntity[] | null;
}
export interface WorkingHoursEntity {
  from: string;
  to: string;
  day: number;
}
export interface SocialsEntity {
  type: string;
  link: string;
}
