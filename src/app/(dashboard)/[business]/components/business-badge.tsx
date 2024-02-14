import { BusinessProviderContext } from "@/providers/business/provider";
import { useCurrentBreakpoints } from "@/utils/hooks";
import classNames from "classnames";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";

const BusinessBadge = () => {
  const breakpoints = useCurrentBreakpoints();
  const { business } = useContext(BusinessProviderContext);
  return (
    <div
      className={twMerge(
        classNames("text-[.9rem] text-typography font-bold", {
          hidden: breakpoints.isXs,
        })
      )}
    >
      ( {business.name} )
    </div>
  );
};

export default BusinessBadge;
