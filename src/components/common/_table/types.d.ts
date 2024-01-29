import { BaseButtonProps } from "antd/lib/button/button";
import { FC, ReactNode } from "react";

type Action = {
  icon?: ReactNode;
  title: string;
  onClick?: (e: Event<any>) => void;
  type?: BaseButtonProps["type"];
  closeActionsOnClick?: boolean;
};

declare interface ITableActionsProps {
  value: unknown;
  record: unknown;
  index: number;
  seeAll?: boolean;
  seeAllNames?: Record<string, string>;
  otherActions?: Action[];
}

declare type ITableActions = FC<ITableActionsProps>;
