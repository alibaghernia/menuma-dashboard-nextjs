import { AxiosResponseType } from "@/lib/auth/types";
import type { AxiosInstance } from "axios";
import { recreateServiceAxiosIns } from "@/services/helpers";
import { ItemsService } from "./items/items.service";
import { CategoriesService } from "./categories/categories.service";
import { PagerService } from "./pager/pager.service";
import { TablesService } from "./tables/tables.service";
import { HallsService } from "./halls/halls.service";

export class BusinessService {
  static init(business_uuid: string) {
    return new BusinessService(business_uuid);
  }

  public axiosIns: AxiosInstance;

  constructor(business_uuid: string) {
    this.axiosIns = recreateServiceAxiosIns(`/panel/business/${business_uuid}`);
  }

  get itemsService() {
    return ItemsService.init(this);
  }
  get categoriesService() {
    return CategoriesService.init(this);
  }
  get pagerService() {
    return PagerService.init(this);
  }
  get tablesService() {
    return TablesService.init(this);
  }
  get hallsService() {
    return HallsService.init(this);
  }
}
