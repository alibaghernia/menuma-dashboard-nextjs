import { BusinessService } from "@/services/dashboard/business.service";
import { BusinessesEntity } from "@/services/types";
import { FC, PropsWithChildren } from "react";

declare interface IBusinessProviderProps {
  business: BusinessesEntity;
}

declare type IBusinessProviderContext = {
  business: BusinessesEntity;
  businessService: BusinessService;
} & IBusinessProviderProps;

declare type IBusinessProvider = FC<PropsWithChildren<IBusinessProviderProps>>;
