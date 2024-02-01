import { TableColumnProps } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { ColumnProps } from "antd/lib/table";
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
  seeAllRender?: Record<string, ColumnProps<unknown>["render"]>;
  seeAllExcludeFields?: string[];
  otherActions?: Action[];
  onEdit?: (item: unknown) => void;
  onDelete?: (item: unknown) => void;
}

declare type ITableActions = FC<ITableActionsProps>;
