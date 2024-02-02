import { FC, PropsWithChildren } from "react";

declare interface IDevelopingBadgeProps {
  type: "DEV";
}

declare type IDevelopingBadge = FC<PropsWithChildren<IDevelopingBadgeProps>>;
