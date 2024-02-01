"use client";

import React, { createContext } from "react";
import { IBusinessProvider, IBusinessProviderContext } from "./types";
import { BusinessService } from "@/services/dashboard/business.service";
import axios from "@/lib/axios";

//@ts-ignore
export const BusinessProviderContext =
  //@ts-ignore
  createContext<IBusinessProviderContext>();

export const BusinessProvider: IBusinessProvider = ({
  children,
  business,
  session,
  ...props
}) => {
  axios.defaults.headers.common.Authorization = `Bearer ${session.user?.access_token}`;
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
