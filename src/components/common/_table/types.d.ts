import { FC } from "react";

declare interface ITableActionsProps {
  value: unknown;
  record: unknown;
  index: number;
  seeAll?: boolean;
  seeAllNames?: Record<string, string>;
}

declare type ITableActions = FC<ITableActionsProps>;
