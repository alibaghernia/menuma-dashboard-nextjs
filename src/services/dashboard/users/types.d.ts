export interface User {
  uuid: string;
  first_name: string;
  last_name: string;
  username: string;
  mobile: string;
  email?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  businesses?: BusinessesEntity[] | null;
  access_token: string;
}
export interface BusinessesEntity {
  uuid: string;
  name: string;
  slug: string;
  BusinessUser: {
    role: string;
  };
}
