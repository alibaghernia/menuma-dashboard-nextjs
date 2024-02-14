export interface QrCodeEntity {
  uuid: string;
  slug: string;
  type: string;
  metadata: Metadata;
}
export interface Metadata {
  destination?: string;
  queryParams?: QueryParams;
}
export interface QueryParams {
  tab_id: string;
}

export interface IGetItemsFilters extends Partial<IPagination> {
  slug?: string;
}
