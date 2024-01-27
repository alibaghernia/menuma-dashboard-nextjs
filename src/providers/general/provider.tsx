"use client";

import React, { createContext, useEffect, useState } from "react";
import { LOADINGS } from "./constants";
import { IGeneralProvider, IGeneralProviderContext } from "./types";
import { Loading } from "@/components/common/loading/loading";
import { useRouter } from "next/navigation";
import useRouteChange from "../routeChange/hooks";

//@ts-ignore
export const GeneralProviderContext = createContext<IGeneralProviderContext>();

export const GeneralProvider: IGeneralProvider = ({ children }) => {
  const [loadings, setLoadings] = useState<string[]>([LOADINGS.page]);
  const router = useRouter();

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
          loadings,
          setLoadings,
        }}
      >
        {children}
      </GeneralProviderContext.Provider>
      {!!loadings.length && <Loading />}
    </>
  );
};
