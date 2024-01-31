"use client";

import React, { createContext } from "react";
import { IBusinessProvider, IBusinessProviderContext } from "./types";
import { BusinessService } from "@/services/dashboard/business.service";

//@ts-ignore
export const BusinessProviderContext =
  //@ts-ignore
  createContext<IBusinessProviderContext>();

export const BusinessProvider: IBusinessProvider = ({
  children,
  business,
  ...props
}) => {
  const businessService = BusinessService.init(business.uuid);

  return (
    <>
      <BusinessProviderContext.Provider
        value={{
          business,
          businessService,
          ...props,
        }}
      >
        {children}
      </BusinessProviderContext.Provider>
    </>
  );
};
