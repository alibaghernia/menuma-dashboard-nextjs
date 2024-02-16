import { User } from "../dashboard/users/types";

declare interface GetAllItemsFilter {
  page?: number;
  limit?: number;
  name?: string;
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
  domain: string;
  pin: boolean;
  email: string;
  working_hours?: WorkingHoursEntity[] | null;
  logo: string;
  logo_url?: string;
  banner: string;
  banner_url?: string;
  pager: boolean;
  customer_club: boolean;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  socials?: SocialsEntity[] | null;
  users?: Pick<User, "uuid">[];
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
