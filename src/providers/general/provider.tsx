"use client";

import React, { createContext, useEffect, useState } from "react";
import { LOADINGS } from "./constants";
import { IGeneralProvider, IGeneralProviderContext } from "./types";
import { Loading } from "@/components/common/loading/loading";
import useRouteChange from "../routeChange/hooks";
import { message } from "antd/lib";

//@ts-ignore
export const GeneralProviderContext = createContext<IGeneralProviderContext>();

export const GeneralProvider: IGeneralProvider = ({ children, ...props }) => {
  const [loadings, setLoadings] = useState<string[]>([LOADINGS.page]);
  const [messageApi, contextHolder] = message.useMessage();

  const addLoading = (loading_id: string) => {
    setLoadings((loadings) => [...loadings, loading_id]);
  };
  const removeLoading = (loading_id: string) => {
    setLoadings((loadings) => loadings.filter((item) => item != loading_id));
  };
  useRouteChange({
    onRouteChangeStart: () => {
      setLoadings((loadings) =>
        Array.from(new Set([...loadings, LOADINGS.page]))
      );
    },
    onRouteChangeComplete: () => {
      setLoadings((loadings) =>
        loadings.filter((loading) => loading != LOADINGS.page)
      );
    },
  });

  return (
    <>
      <GeneralProviderContext.Provider
        value={{
          addLoading,
          removeLoading,
          loadings,
          setLoadings,
          messageApi,

          ...props,
        }}
      >
        {children}
      </GeneralProviderContext.Provider>
      {contextHolder}
      {!!loadings.filter((load) => !load.endsWith("-noall")).length && (
        <Loading />
      )}
    </>
  );
};
