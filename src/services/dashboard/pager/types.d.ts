export interface Request {
  uuid: string;
  status: "TODO" | "DOING" | "DONE";
  createdAt: string;
  updatedAt: string;
  business_uuid: string;
  table_uuid: string;
  table: Table;
}
export interface Table {
  uuid: string;
  business_uuid: string;
  code: string;
  limit: number;
  description?: string;
  hall_uuid?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetRequestFilters {
  status?: ("TODO" | "DOING" | "DONE")[];
  page?: number;
  limit?: number;
}
