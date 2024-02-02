import { BusinessService } from "@/services/dashboard/business.service";
import { BusinessesEntity } from "@/services/dashboard/users/types";
import { Session } from "next-auth";
import { FC, PropsWithChildren } from "react";

declare interface IBusinessProviderProps {
  business: BusinessesEntity;
  session: Session;
}

declare type IBusinessProviderContext = {
  business: BusinessesEntity;
  businessService: BusinessService;
};

declare type IBusinessProvider = FC<PropsWithChildren<IBusinessProviderProps>>;
